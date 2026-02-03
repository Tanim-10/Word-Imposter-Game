// Game Reducer - Handles game state transitions
import { GAME_PHASES } from '../constants/gameRules';

// Load saved players from localStorage
const loadSavedPlayers = () => {
    try {
        const saved = localStorage.getItem('wordImposterPlayers');
        if (saved) {
            const players = JSON.parse(saved);
            return players.map(name => ({
                id: Date.now() + Math.random(),
                name,
                isImposter: false,
                hasVoted: false,
                votedFor: null,
                isEliminated: false,
            }));
        }
    } catch (e) {
        console.error('Failed to load saved players:', e);
    }
    return [];
};

// Save players to localStorage
const savePlayers = (players) => {
    try {
        const names = players.map(p => p.name);
        localStorage.setItem('wordImposterPlayers', JSON.stringify(names));
    } catch (e) {
        console.error('Failed to save players:', e);
    }
};

export const initialGameState = {
    players: loadSavedPlayers(),
    imposterCount: 1,
    currentPlayerIndex: 0,
    votes: {},
    gamePhase: GAME_PHASES.SETUP,
    imposters: [],
    selectedCategories: [], 
    showRoles: false,
    votingEnabled: false,
    eliminatedPlayers: [],
    roundNumber: 1,
    lastEliminatedId: null,
    gameOver: false,
    impostersWon: false,
};

export const gameReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_PLAYER': {
            const newPlayers = [...state.players, {
                id: Date.now(),
                name: action.payload.name,
                isImposter: false,
                hasVoted: false,
                votedFor: null,
                isEliminated: false,
            }];
            savePlayers(newPlayers);
            return { ...state, players: newPlayers };
        }

        case 'REMOVE_PLAYER': {
            const newPlayers = state.players.filter(p => p.id !== action.payload.id);
            savePlayers(newPlayers);
            return { ...state, players: newPlayers };
        }

        case 'REORDER_PLAYERS': {
            const { fromIndex, toIndex } = action.payload;
            const newPlayers = [...state.players];
            const [moved] = newPlayers.splice(fromIndex, 1);
            newPlayers.splice(toIndex, 0, moved);
            savePlayers(newPlayers);
            return { ...state, players: newPlayers };
        }

        case 'CLEAR_PLAYERS': {
            localStorage.removeItem('wordImposterPlayers');
            return { ...state, players: [] };
        }

        case 'SET_IMPOSTER_COUNT':
            return { ...state, imposterCount: action.payload.count };

        case 'SET_CATEGORY': {
            const { category } = action.payload;
            if (category === null) {
                return { ...state, selectedCategories: [] };
            }
            const current = state.selectedCategories || [];
            const isSelected = current.includes(category);
            const newCategories = isSelected
                ? current.filter(c => c !== category)
                : [...current, category];
            return { ...state, selectedCategories: newCategories };
        }

        case 'SET_SHOW_ROLES':
            return { ...state, showRoles: action.payload.showRoles };

        case 'SET_VOTING_ENABLED':
            return { ...state, votingEnabled: action.payload.votingEnabled };

        case 'START_GAME': {
            const playerCount = state.players.length;
            const imposterIndices = [];
            const availableIndices = [...Array(playerCount).keys()];

            for (let i = 0; i < state.imposterCount && availableIndices.length > 0; i++) {
                const randomIndex = Math.floor(Math.random() * availableIndices.length);
                imposterIndices.push(availableIndices[randomIndex]);
                availableIndices.splice(randomIndex, 1);
            }

            const updatedPlayers = state.players.map((player, index) => ({
                ...player,
                isImposter: imposterIndices.includes(index),
                isEliminated: false,
                hasVoted: false,
                votedFor: null,
            }));

            return {
                ...state,
                players: updatedPlayers,
                imposters: imposterIndices,
                gamePhase: GAME_PHASES.REVEAL,
                currentPlayerIndex: 0,
                eliminatedPlayers: [],
                roundNumber: 1,
                gameOver: false,
                impostersWon: false,
                votes: {},
            };
        }

        case 'NEXT_PLAYER':
            return { ...state, currentPlayerIndex: state.currentPlayerIndex + 1 };

        case 'START_DISCUSSION':
            return { ...state, gamePhase: GAME_PHASES.DISCUSSION };

        case 'START_VOTING':
            return { ...state, gamePhase: GAME_PHASES.VOTING, currentPlayerIndex: 0, votes: {} };

        case 'CAST_VOTE': {
            const { voterId, votedForId } = action.payload;
            const updatedPlayers = state.players.map(player =>
                player.id === voterId
                    ? { ...player, hasVoted: true, votedFor: votedForId }
                    : player
            );
            return {
                ...state,
                players: updatedPlayers,
                votes: { ...state.votes, [voterId]: votedForId },
            };
        }

        case 'ELIMINATE_PLAYER': {
            const { playerId } = action.payload;
            const updatedPlayers = state.players.map(player =>
                player.id === playerId ? { ...player, isEliminated: true } : player
            );

            const activePlayers = updatedPlayers.filter(p => !p.isEliminated);
            const activeImposters = activePlayers.filter(p => p.isImposter);
            const activeCivilians = activePlayers.filter(p => !p.isImposter);

            let gameOver = false;
            let impostersWon = false;

            if (activeImposters.length === 0) {
                gameOver = true;
                impostersWon = false;
            } else if (activeImposters.length >= activeCivilians.length) {
                gameOver = true;
                impostersWon = true;
            }

            return {
                ...state,
                players: updatedPlayers,
                eliminatedPlayers: [...state.eliminatedPlayers, playerId],
                lastEliminatedId: playerId,
                gameOver,
                impostersWon,
                gamePhase: GAME_PHASES.RESULTS,
            };
        }

        case 'CONTINUE_GAME': {
            return {
                ...state,
                gamePhase: state.votingEnabled ? GAME_PHASES.VOTING : GAME_PHASES.VOTING,
                currentPlayerIndex: 0,
                votes: {},
                roundNumber: state.roundNumber + 1,
                lastEliminatedId: null,
                players: state.players.map(p => ({ ...p, hasVoted: false, votedFor: null })),
            };
        }

        case 'SHOW_RESULTS':
            return { ...state, gamePhase: GAME_PHASES.RESULTS };

        case 'RESET_GAME':
            return { ...initialGameState, players: loadSavedPlayers() };

        case 'PLAY_AGAIN':
            return {
                ...initialGameState,
                players: state.players.map(p => ({
                    ...p,
                    isImposter: false,
                    hasVoted: false,
                    votedFor: null,
                    isEliminated: false,
                })),
                selectedCategories: state.selectedCategories,
                showRoles: state.showRoles,
                votingEnabled: state.votingEnabled,
                imposterCount: state.imposterCount,
            };

        default:
            return state;
    }
};
