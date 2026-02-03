import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { useGame } from "../context/GameContext";
import { useWords } from "../context/WordContext";

const RevealRole = () => {
    const navigate = useNavigate();
    const [isRevealed, setIsRevealed] = useState(false);
    const [showQuitModal, setShowQuitModal] = useState(false);

    const {
        players,
        currentPlayerIndex,
        nextPlayer,
        startVoting,
        showRoles,
        resetGame,
        votingEnabled,
    } = useGame();
    const { getWordForPlayer, categoryName } = useWords();

    const currentPlayer = players[currentPlayerIndex];
    const isLastPlayer = currentPlayerIndex === players.length - 1;
    const playerWord = currentPlayer ? getWordForPlayer(currentPlayer.isImposter) : null;

    const handleReveal = () => {
        setIsRevealed(true);
    };

    const handleNext = () => {
        setIsRevealed(false);

        if (isLastPlayer) {
            // Go straight to voting/elimination (skip discussion)
            if (votingEnabled) {
                startVoting();
                navigate("/voting");
            } else {
                navigate("/eliminate");
            }
        } else {
            nextPlayer();
        }
    };

    const handleQuitGame = () => {
        resetGame();
        navigate("/");
    };

    if (!currentPlayer) return null;

    return (
        <div className="screen-container">
            <div className="w-full max-w-md text-center">
                {/* Quit Button */}
                <button
                    onClick={() => setShowQuitModal(true)}
                    className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                >
                    ✕ Quit
                </button>

                {/* Progress */}
                <div className="mb-8 animate-fade-in">
                    <div className="flex justify-center gap-2 mb-3">
                        {players.map((_, index) => (
                            <div
                                key={index}
                                className={`w-3 h-3 rounded-full transition-all ${index < currentPlayerIndex
                                        ? 'bg-green-500'
                                        : index === currentPlayerIndex
                                            ? 'bg-blue-500 w-6'
                                            : 'bg-slate-700'
                                    }`}
                            />
                        ))}
                    </div>
                    <p className="text-slate-400 text-sm">
                        Player {currentPlayerIndex + 1} of {players.length}
                    </p>
                </div>

                {/* Pass Phone Message */}
                {!isRevealed && (
                    <div className="animate-fade-in">
                        <div className="mb-8">
                            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                                <span className="text-4xl">📱</span>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">
                                Pass to {currentPlayer.name}
                            </h2>
                            <p className="text-slate-400">
                                Only {currentPlayer.name} should see the next screen
                            </p>
                        </div>

                        <Button onClick={handleReveal} fullWidth>
                            👆 Tap to Reveal Your Word
                        </Button>
                    </div>
                )}

                {/* Revealed Content - No auto-hide timer */}
                {isRevealed && (
                    <div className="animate-scale-in">
                        {/* Category Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 mb-6">
                            <span className="text-sm text-slate-400">Category:</span>
                            <span className="text-sm text-white font-medium">{categoryName}</span>
                        </div>

                        {/* Role Card */}
                        {showRoles ? (
                            <div className={`p-8 rounded-3xl mb-6 ${currentPlayer.isImposter
                                    ? 'bg-gradient-to-br from-red-900/50 to-rose-900/50 border-2 border-red-500/50'
                                    : 'bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-2 border-green-500/50'
                                }`}>
                                <div className="text-6xl mb-4">
                                    {currentPlayer.isImposter ? '🎭' : '✓'}
                                </div>

                                {currentPlayer.isImposter ? (
                                    <>
                                        <h2 className="text-3xl font-bold text-red-400 mb-3">You are the Imposter!</h2>
                                        <p className="text-xl text-white">
                                            Your word: <span className="font-bold text-red-300">{playerWord}</span>
                                        </p>
                                        <p className="mt-4 text-sm text-red-400/70">Others have a different word. Blend in!</p>
                                    </>
                                ) : (
                                    <>
                                        <h2 className="text-3xl font-bold text-green-400 mb-3">You are a Civilian</h2>
                                        <p className="text-xl text-white">
                                            Your word: <span className="font-bold text-green-300">{playerWord}</span>
                                        </p>
                                        <p className="mt-4 text-sm text-green-400/70">Find who has a different word!</p>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="p-8 rounded-3xl mb-6 bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-2 border-blue-500/50">
                                <div className="text-6xl mb-4">🔤</div>
                                <h2 className="text-2xl font-bold text-blue-400 mb-3">Your Word</h2>
                                <p className="text-4xl font-bold text-white mb-4">{playerWord}</p>
                                <p className="text-sm text-blue-400/70">Someone might have a different word...</p>
                            </div>
                        )}

                        <Button onClick={handleNext} fullWidth>
                            {isLastPlayer ? '🗳️ Start Voting' : '➡️ Next Player'}
                        </Button>
                    </div>
                )}
            </div>

            {/* Quit Modal */}
            <Modal isOpen={showQuitModal} onClose={() => setShowQuitModal(false)} title="Quit Game?">
                <div className="text-center">
                    <p className="text-slate-300 mb-6">End the game for everyone?</p>
                    <div className="flex gap-3">
                        <Button onClick={() => setShowQuitModal(false)} variant="secondary" fullWidth>Continue</Button>
                        <Button onClick={handleQuitGame} variant="danger" fullWidth>Quit</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default RevealRole;
