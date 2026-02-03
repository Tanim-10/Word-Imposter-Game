import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { useGame } from "../context/GameContext";
import { useWords } from "../context/WordContext";
import { GAME_RULES } from "../constants/gameRules";
import { getAllCategories, getCategoryList, isCustomCategory } from "../data/categories";

const SetupGame = () => {
    const navigate = useNavigate();
    const [playerName, setPlayerName] = useState("");
    const [error, setError] = useState("");
    const [showQuitModal, setShowQuitModal] = useState(false);
    const [showClearModal, setShowClearModal] = useState(false);
    const [categories, setCategories] = useState({});
    const [categoryList, setCategoryList] = useState([]);

    const {
        players,
        addPlayer,
        removePlayer,
        reorderPlayers,
        clearPlayers,
        imposterCount,
        setImposterCount,
        selectedCategories,
        toggleCategory,
        clearCategories,
        showRoles,
        setShowRoles,
        votingEnabled,
        setVotingEnabled,
        startGame,
        resetGame,
    } = useGame();

    const { selectWords } = useWords();

    useEffect(() => {
        setCategories(getAllCategories());
        setCategoryList(getCategoryList());
    }, []);

    const handleAddPlayer = () => {
        const trimmedName = playerName.trim();
        if (!trimmedName) { setError("Please enter a name"); return; }
        if (players.some(p => p.name.toLowerCase() === trimmedName.toLowerCase())) {
            setError("This name is already taken"); return;
        }
        if (players.length >= GAME_RULES.MAX_PLAYERS) {
            setError(`Maximum ${GAME_RULES.MAX_PLAYERS} players allowed`); return;
        }
        addPlayer(trimmedName);
        setPlayerName("");
        setError("");
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") handleAddPlayer();
    };

    const handleMoveUp = (index) => {
        if (index > 0) reorderPlayers(index, index - 1);
    };

    const handleMoveDown = (index) => {
        if (index < players.length - 1) reorderPlayers(index, index + 1);
    };

    const handleStartGame = () => {
        if (players.length < GAME_RULES.MIN_PLAYERS) {
            setError(`Need at least ${GAME_RULES.MIN_PLAYERS} players to start`);
            return;
        }
        selectWords(selectedCategories);
        startGame();
        navigate("/reveal");
    };

    const handleQuitGame = () => {
        resetGame();
        navigate("/");
    };

    const handleClearAll = () => {
        clearPlayers();
        setShowClearModal(false);
    };

    const canStart = players.length >= GAME_RULES.MIN_PLAYERS;
    const maxImposters = Math.min(GAME_RULES.MAX_IMPOSTERS, Math.floor(players.length / 2));
    const isAllRandom = selectedCategories.length === 0;

    return (
        <div className="screen-container overflow-y-auto py-6">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-4 animate-fade-in">
                    <h1 className="text-3xl font-bold text-white mb-1">Game Setup</h1>
                    <p className="text-slate-400 text-sm">Add players and configure settings</p>
                </div>

                {/* Player Input */}
                <div className="mb-3 animate-fade-in">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Enter player name"
                            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                            maxLength={20}
                        />
                        <Button onClick={handleAddPlayer} className="!px-5">Add</Button>
                    </div>
                    {error && <p className="mt-1.5 text-red-400 text-sm">{error}</p>}
                </div>

                {/* Player Count & Clear */}
                <div className="flex items-center justify-between mb-2 px-1">
                    <span className="text-slate-400 text-sm">
                        Players: <span className={`font-bold ${canStart ? 'text-green-400' : 'text-yellow-400'}`}>
                            {players.length}
                        </span>/{GAME_RULES.MAX_PLAYERS}
                    </span>
                    {players.length > 0 && (
                        <button onClick={() => setShowClearModal(true)} className="text-xs text-red-400 hover:text-red-300">
                            Clear All
                        </button>
                    )}
                </div>

                {/* Player List */}
                <div className="space-y-1.5 mb-4 max-h-[140px] overflow-y-auto no-scrollbar">
                    {players.length === 0 ? (
                        <div className="text-center py-6 text-slate-500">
                            <p className="text-2xl mb-1">👥</p>
                            <p className="text-sm">Add at least {GAME_RULES.MIN_PLAYERS} players</p>
                        </div>
                    ) : (
                        players.map((player, index) => (
                            <div key={player.id} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/50 border border-slate-700">
                                <div className="flex flex-col gap-0.5">
                                    <button onClick={() => handleMoveUp(index)} disabled={index === 0}
                                        className={`p-0.5 rounded text-xs ${index === 0 ? 'text-slate-600' : 'text-slate-400 hover:text-white'}`}>▲</button>
                                    <button onClick={() => handleMoveDown(index)} disabled={index === players.length - 1}
                                        className={`p-0.5 rounded text-xs ${index === players.length - 1 ? 'text-slate-600' : 'text-slate-400 hover:text-white'}`}>▼</button>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                                    {player.name.charAt(0).toUpperCase()}
                                </div>
                                <span className="flex-1 text-white text-sm">{player.name}</span>
                                <span className="text-slate-500 text-xs mr-1">#{index + 1}</span>
                                <button onClick={() => removePlayer(player.id)}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-700">✕</button>
                            </div>
                        ))
                    )}
                </div>

                {/* Settings */}
                <div className="space-y-2.5 mb-5">
                    {/* Category Selection - Multi-select */}
                    <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-xs text-slate-400">📁 Categories</label>
                            {selectedCategories.length > 0 && (
                                <button onClick={clearCategories} className="text-xs text-blue-400 hover:text-blue-300">
                                    Select All
                                </button>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {isAllRandom && (
                                <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-600 text-white">
                                    🎲 All Categories
                                </span>
                            )}
                            {categoryList.map(key => {
                                const isSelected = selectedCategories.includes(key);
                                const isCustom = isCustomCategory(key);
                                return (
                                    <button
                                        key={key}
                                        onClick={() => toggleCategory(key)}
                                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${isSelected
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                            } ${isCustom ? 'border border-blue-500/50' : ''}`}
                                    >
                                        {isCustom && '⭐ '}{categories[key]?.name}
                                    </button>
                                );
                            })}
                        </div>
                        <p className="mt-2 text-xs text-slate-500">
                            {isAllRandom
                                ? "Random from all categories"
                                : `Random from ${selectedCategories.length} selected`}
                        </p>
                    </div>

                    {/* Imposter Count */}
                    {players.length >= GAME_RULES.MIN_PLAYERS && (
                        <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700">
                            <label className="block text-xs text-slate-400 mb-2">🎭 Imposters</label>
                            <div className="flex gap-2">
                                {[1, 2, 3].map(num => (
                                    <button key={num} onClick={() => setImposterCount(num)} disabled={num > maxImposters}
                                        className={`flex-1 py-1.5 rounded-lg font-semibold text-sm transition-all ${imposterCount === num ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                            } ${num > maxImposters ? 'opacity-30 cursor-not-allowed' : ''}`}>{num}</button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Role Visibility */}
                    <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700">
                        <label className="block text-xs text-slate-400 mb-2">👁️ Roles</label>
                        <div className="flex gap-2">
                            <button onClick={() => setShowRoles(true)}
                                className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${showRoles ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>🎭 Show</button>
                            <button onClick={() => setShowRoles(false)}
                                className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${!showRoles ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>❓ Hide</button>
                        </div>
                    </div>

                    {/* Voting Mode */}
                    <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700">
                        <label className="block text-xs text-slate-400 mb-2">🗳️ Voting</label>
                        <div className="flex gap-2">
                            <button onClick={() => setVotingEnabled(true)}
                                className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${votingEnabled ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>🗳️ Individual</button>
                            <button onClick={() => setVotingEnabled(false)}
                                className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${!votingEnabled ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>👆 Group Pick</button>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                    <Button onClick={handleStartGame} disabled={!canStart} fullWidth>
                        {canStart ? '🚀 Start Game' : `Need ${GAME_RULES.MIN_PLAYERS - players.length} more`}
                    </Button>
                    <Button onClick={() => setShowQuitModal(true)} variant="ghost" fullWidth>← Back</Button>
                </div>
            </div>

            {/* Modals */}
            <Modal isOpen={showQuitModal} onClose={() => setShowQuitModal(false)} title="Quit Setup?">
                <div className="text-center">
                    <p className="text-slate-300 mb-4 text-sm">Go back to home? Players will be saved.</p>
                    <div className="flex gap-3">
                        <Button onClick={() => setShowQuitModal(false)} variant="secondary" fullWidth>Cancel</Button>
                        <Button onClick={handleQuitGame} fullWidth>Go Back</Button>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={showClearModal} onClose={() => setShowClearModal(false)} title="Clear All Players?">
                <div className="text-center">
                    <p className="text-slate-300 mb-4 text-sm">Remove all players from the list?</p>
                    <div className="flex gap-3">
                        <Button onClick={() => setShowClearModal(false)} variant="secondary" fullWidth>Cancel</Button>
                        <Button onClick={handleClearAll} variant="danger" fullWidth>Clear All</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default SetupGame;
