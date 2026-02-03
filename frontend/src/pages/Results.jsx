import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useGame } from "../context/GameContext";
import { useWords } from "../context/WordContext";

const Results = () => {
    const navigate = useNavigate();
    const {
        players,
        votes,
        resetGame,
        playAgain,
        selectedCategories,
        lastEliminatedId,
        gameOver,
        impostersWon,
        continueGame,
        getActivePlayers,
        roundNumber,
        votingEnabled,
    } = useGame();
    const { mainWord, imposterWord, categoryName, selectWords } = useWords();

    const eliminatedPlayer = players.find(p => p.id === lastEliminatedId);
    const activePlayers = getActivePlayers();
    const imposters = players.filter(p => p.isImposter);
    const activeImposters = activePlayers.filter(p => p.isImposter);
    const eliminatedWasImposter = eliminatedPlayer?.isImposter;

    const voteResults = useMemo(() => {
        if (!votingEnabled) return { voteCounts: {} };
        const voteCounts = {};
        Object.values(votes).forEach(votedForId => {
            voteCounts[votedForId] = (voteCounts[votedForId] || 0) + 1;
        });
        return { voteCounts };
    }, [votes, votingEnabled]);

    const handlePlayAgain = () => {
        selectWords(selectedCategories);
        playAgain();
        navigate("/reveal");
    };

    const handleNewGame = () => {
        resetGame();
        navigate("/");
    };

    const handleContinue = () => {
        continueGame();
        // Go directly to voting/elimination (skip discussion)
        if (votingEnabled) {
            navigate("/voting");
        } else {
            navigate("/eliminate");
        }
    };

    return (
        <div className="screen-container overflow-y-auto py-6">
            <div className="w-full max-w-md">
                {/* Round Badge */}
                <div className="text-center mb-3 animate-fade-in">
                    <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-400">
                        Round {roundNumber}
                    </span>
                </div>

                {/* Elimination Result */}
                <div className={`text-center mb-5 animate-fade-in ${eliminatedWasImposter ? 'text-green-400' : 'text-red-400'}`}>
                    <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-3 shadow-xl ${eliminatedWasImposter
                        ? 'bg-gradient-to-br from-green-500 to-emerald-600 shadow-green-500/30'
                        : 'bg-gradient-to-br from-red-500 to-rose-600 shadow-red-500/30'
                        }`}>
                        <span className="text-3xl">{eliminatedWasImposter ? '✓' : '✕'}</span>
                    </div>
                    <h2 className="text-xl font-bold mb-1">{eliminatedPlayer?.name} eliminated</h2>
                    <p className={`text-sm ${eliminatedWasImposter ? 'text-green-400' : 'text-red-400'}`}>
                        {eliminatedWasImposter ? "Had a different word!" : "Had the same word!"}
                    </p>
                </div>

                {/* Game Over Banner */}
                {gameOver && (
                    <div className={`text-center mb-5 p-5 rounded-2xl animate-fade-in ${impostersWon ? 'bg-red-500/10 border-2 border-red-500/30' : 'bg-green-500/10 border-2 border-green-500/30'
                        }`}>
                        <div className="text-4xl mb-2">{impostersWon ? '😈' : '🎉'}</div>
                        <h1 className="text-2xl font-extrabold mb-1">
                            {impostersWon ? 'Imposters Win!' : 'Civilians Win!'}
                        </h1>
                        <p className="text-slate-400 text-sm">
                            {impostersWon ? 'The imposters took over!' : 'All imposters found!'}
                        </p>
                    </div>
                )}

                {/* Words Reveal (game over only) */}
                {gameOver && (
                    <div className="mb-5 card animate-fade-in">
                        <div className="text-center mb-3">
                            <span className="text-xs text-slate-400">Category</span>
                            <h3 className="text-lg font-bold text-white">{categoryName}</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/30 text-center">
                                <span className="text-xs text-green-400 block mb-1">Main Word</span>
                                <span className="font-bold text-white">{mainWord}</span>
                            </div>
                            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-center">
                                <span className="text-xs text-red-400 block mb-1">Different</span>
                                <span className="font-bold text-white">{imposterWord}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Imposters Status (game over only) */}
                {gameOver && (
                    <div className="mb-5 animate-fade-in">
                        <h3 className="text-xs text-slate-400 mb-2 text-center">Players with different word:</h3>
                        <div className="space-y-2">
                            {imposters.map(imp => (
                                <div key={imp.id} className={`p-3 rounded-xl flex items-center gap-3 ${imp.isEliminated ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'
                                    }`}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${imp.isEliminated ? 'bg-gradient-to-br from-green-500 to-emerald-600' : 'bg-gradient-to-br from-red-500 to-rose-600'
                                        }`}>{imp.name.charAt(0).toUpperCase()}</div>
                                    <div>
                                        <p className="text-white font-medium">{imp.name}</p>
                                        <p className={`text-xs ${imp.isEliminated ? 'text-green-400' : 'text-red-400'}`}>
                                            {imp.isEliminated ? '✓ Caught' : '✕ Escaped'}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Continue Message (game not over) */}
                {!gameOver && (
                    <div className="mb-5 p-4 rounded-xl bg-orange-500/10 border border-orange-500/30 text-center animate-fade-in">
                        <p className="text-orange-400 font-medium mb-1">Game continues...</p>
                        <p className="text-slate-400 text-sm">
                            {activeImposters.length} imposter{activeImposters.length !== 1 ? 's' : ''} among {activePlayers.length} players
                        </p>
                    </div>
                )}

                {/* Vote Breakdown (voting mode) */}
                {votingEnabled && Object.keys(voteResults.voteCounts).length > 0 && (
                    <div className="mb-5 animate-fade-in">
                        <h3 className="text-xs text-slate-400 mb-2 text-center">Vote Breakdown</h3>
                        <div className="space-y-1.5">
                            {players.filter(p => !p.isEliminated || p.id === lastEliminatedId).map(player => {
                                const voteCount = voteResults.voteCounts[player.id] || 0;
                                return (
                                    <div key={player.id} className={`flex items-center gap-2 p-2 rounded-lg border ${player.id === lastEliminatedId ? 'bg-red-900/30 border-red-500/50' : 'bg-slate-800/50 border-slate-700'
                                        }`}>
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs ${player.isImposter ? 'bg-red-500' : 'bg-violet-500'
                                            }`}>{player.name.charAt(0).toUpperCase()}</div>
                                        <span className="flex-1 text-white text-sm">{player.name}</span>
                                        <span className="font-bold text-white text-sm">{voteCount}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="space-y-2 animate-fade-in">
                    {gameOver ? (
                        <>
                            <Button onClick={handlePlayAgain} fullWidth>🔄 Play Again</Button>
                            <Button onClick={handleNewGame} variant="secondary" fullWidth>🏠 New Game</Button>
                        </>
                    ) : (
                        <Button onClick={handleContinue} fullWidth>➡️ Continue to Round {roundNumber + 1}</Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Results;
