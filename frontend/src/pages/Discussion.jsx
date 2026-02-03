import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { useGame } from "../context/GameContext";
import { useWords } from "../context/WordContext";
import { GAME_RULES } from "../constants/gameRules";

const Discussion = () => {
    const navigate = useNavigate();
    const [timerEnded, setTimerEnded] = useState(false);
    const [showQuitModal, setShowQuitModal] = useState(false);

    const { players, startVoting, resetGame, votingEnabled, roundNumber, getActivePlayers } = useGame();
    const { categoryName } = useWords();

    const activePlayers = getActivePlayers();

    const handleTimerComplete = () => {
        setTimerEnded(true);
    };

    const handleProceed = () => {
        if (votingEnabled) {
            startVoting();
            navigate("/voting");
        } else {
            navigate("/eliminate");
        }
    };

    const handleQuitGame = () => {
        resetGame();
        navigate("/");
    };

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

                {/* Round Badge */}
                {roundNumber > 1 && (
                    <div className="mb-4 animate-fade-in">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-600/20 border border-orange-500/30">
                            <span className="text-sm text-orange-400">Round {roundNumber}</span>
                            <span className="text-sm text-slate-400">•</span>
                            <span className="text-sm text-slate-300">{activePlayers.length} players left</span>
                        </div>
                    </div>
                )}

                {/* Header */}
                <div className="mb-6 animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-600/20 border border-violet-500/30 mb-4">
                        <span className="text-sm text-violet-400">Category:</span>
                        <span className="text-sm text-white font-medium">{categoryName}</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Discussion Time</h1>
                    <p className="text-slate-400">
                        Describe the word without saying it directly
                    </p>
                </div>

                {/* Timer */}
                <div className="mb-6 animate-fade-in stagger-1">
                    <Timer
                        initialSeconds={GAME_RULES.DISCUSSION_TIME}
                        onComplete={handleTimerComplete}
                        size="large"
                    />
                </div>

                {/* Instructions */}
                <div className="mb-6 animate-fade-in stagger-2">
                    <div className="card text-left">
                        <h3 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
                            <span>💡</span> Tips
                        </h3>
                        <ul className="space-y-1 text-slate-300 text-sm">
                            <li className="flex items-start gap-2">
                                <span className="text-green-400">✓</span>
                                Ask questions about the word
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-400">✓</span>
                                Watch for confused reactions
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-400">✗</span>
                                Don't say the word directly
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Active Player List */}
                <div className="mb-6 animate-fade-in stagger-3">
                    <h3 className="text-sm text-slate-400 mb-2">Active Players</h3>
                    <div className="flex flex-wrap justify-center gap-2">
                        {activePlayers.map((player, index) => (
                            <div
                                key={player.id}
                                className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm text-white"
                            >
                                <span className="text-slate-500 mr-1">{index + 1}.</span>
                                {player.name}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Proceed Button */}
                <div className="animate-fade-in stagger-4">
                    <Button
                        onClick={handleProceed}
                        fullWidth
                        variant={timerEnded ? "primary" : "secondary"}
                    >
                        {timerEnded
                            ? (votingEnabled ? '⏰ Time\'s Up! Start Voting' : '⏰ Time\'s Up! Pick Someone')
                            : (votingEnabled ? '🗳️ End Discussion & Vote' : '👆 End Discussion & Pick')
                        }
                    </Button>
                </div>
            </div>

            {/* Quit Confirmation Modal */}
            <Modal
                isOpen={showQuitModal}
                onClose={() => setShowQuitModal(false)}
                title="Quit Game?"
            >
                <div className="text-center">
                    <p className="text-slate-300 mb-6">
                        Are you sure you want to quit? The game will end for everyone.
                    </p>
                    <div className="flex gap-3">
                        <Button
                            onClick={() => setShowQuitModal(false)}
                            variant="secondary"
                            fullWidth
                        >
                            Continue
                        </Button>
                        <Button onClick={handleQuitGame} variant="danger" fullWidth>
                            Quit Game
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Discussion;
