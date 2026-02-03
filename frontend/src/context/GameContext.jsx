// Game Context - Manages game flow state
import { createContext, useContext, useReducer } from 'react';
import { gameReducer, initialGameState } from './gameReducer';

const GameContext = createContext(null);

export const GameProvider = ({ children }) => {
    const [state, dispatch] = useReducer(gameReducer, initialGameState);

    const addPlayer = (name) => dispatch({ type: 'ADD_PLAYER', payload: { name } });
    const removePlayer = (id) => dispatch({ type: 'REMOVE_PLAYER', payload: { id } });
    const reorderPlayers = (fromIndex, toIndex) => dispatch({ type: 'REORDER_PLAYERS', payload: { fromIndex, toIndex } });
    const clearPlayers = () => dispatch({ type: 'CLEAR_PLAYERS' });
    const setImposterCount = (count) => dispatch({ type: 'SET_IMPOSTER_COUNT', payload: { count } });
    const toggleCategory = (category) => dispatch({ type: 'SET_CATEGORY', payload: { category } });
    const clearCategories = () => dispatch({ type: 'SET_CATEGORY', payload: { category: null } });
    const setShowRoles = (showRoles) => dispatch({ type: 'SET_SHOW_ROLES', payload: { showRoles } });
    const setVotingEnabled = (votingEnabled) => dispatch({ type: 'SET_VOTING_ENABLED', payload: { votingEnabled } });
    const startGame = () => dispatch({ type: 'START_GAME' });
    const nextPlayer = () => dispatch({ type: 'NEXT_PLAYER' });
    const startDiscussion = () => dispatch({ type: 'START_DISCUSSION' });
    const startVoting = () => dispatch({ type: 'START_VOTING' });
    const castVote = (voterId, votedForId) => dispatch({ type: 'CAST_VOTE', payload: { voterId, votedForId } });
    const eliminatePlayer = (playerId) => dispatch({ type: 'ELIMINATE_PLAYER', payload: { playerId } });
    const continueGame = () => dispatch({ type: 'CONTINUE_GAME' });
    const showResults = () => dispatch({ type: 'SHOW_RESULTS' });
    const resetGame = () => dispatch({ type: 'RESET_GAME' });
    const playAgain = () => dispatch({ type: 'PLAY_AGAIN' });
    const getActivePlayers = () => state.players.filter(p => !p.isEliminated);

    return (
        <GameContext.Provider value={{
            ...state,
            addPlayer,
            removePlayer,
            reorderPlayers,
            clearPlayers,
            setImposterCount,
            toggleCategory,
            clearCategories,
            setShowRoles,
            setVotingEnabled,
            startGame,
            nextPlayer,
            startDiscussion,
            startVoting,
            castVote,
            eliminatePlayer,
            continueGame,
            showResults,
            resetGame,
            playAgain,
            getActivePlayers,
        }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) throw new Error('useGame must be used within a GameProvider');
    return context;
};

export default GameContext;
