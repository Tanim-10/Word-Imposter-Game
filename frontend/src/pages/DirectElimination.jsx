import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import PlayerCard from "../components/PlayerCard";
import Modal from "../components/Modal";
import { useGame } from "../context/GameContext";

const DirectElimination = () => {
    const navigate = useNavigate();
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showQuitModal, setShowQuitModal] = useState(false);

    const { getActivePlayers, eliminatePlayer, resetGame, roundNumber } = useGame();

    const activePlayers = getActivePlayers();

    const handleSelectPlayer = (playerId) => {
        setSelectedPlayer(playerId);
    };

    const handleConfirmEliminate = () => {
        setShowConfirmModal(true);
    };

    const handleEliminate = () => {
        eliminatePlayer(selectedPlayer);
        setShowConfirmModal(false);
        navigate("/results");
    };

    const handleQuitGame = () => {
        resetGame();
        navigate("/");
    };

    const selectedPlayerData = activePlayers.find(p => p.id === selectedPlayer);

    return (
        <div className="screen-container">
            <div className="w-full max-w-md">
                {/* Quit Button */}
                <button
                    onClick={() => setShowQuitModal(true)}
                    className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                >
                    ✕ Quit
                </button>

                {/* Round Badge */}
                {roundNumber > 1 && (
                    <div className="text-center mb-4 animate-fade-in">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-600/20 border border-orange-500/30">
                            <span className="text-sm text-orange-400">Round {roundNumber}</span>
                        </div>
                    </div>
                )}

                {/* Header */}
                <div className="text-center mb-8 animate-fade-in">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-red-500/30">
                        <span className="text-3xl">👆</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-1">
                        Who has a different word?
                    </h2>
                    <p className="text-slate-400">
                        As a group, decide who to eliminate
                    </p>
                </div>

                {/* Player List */}
                <div className="space-y-3 mb-6 animate-fade-in stagger-2">
                    {activePlayers.map((player) => (
                        <PlayerCard
                            key={player.id}
                            player={player}
                            isVotable={true}
                            onVote={handleSelectPlayer}
                            isSelected={selectedPlayer === player.id}
                        />
                    ))}
                </div>

                {/* Confirm Button */}
                <div className="animate-fade-in stagger-3">
                    <Button
                        onClick={handleConfirmEliminate}
                        disabled={!selectedPlayer}
                        variant="danger"
                        fullWidth
                    >
                        {selectedPlayer
                            ? `Eliminate ${selectedPlayerData?.name}`
                            : 'Select a player to eliminate'
                        }
                    </Button>
                </div>
            </div>

            {/* Elimination Confirmation Modal */}
            <Modal
                isOpen={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                title="Confirm Elimination"
            >
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-red-600/20 rounded-2xl flex items-center justify-center mb-4">
                        <span className="text-3xl">⚠️</span>
                    </div>
                    <p className="text-white text-lg mb-2">
                        Eliminate
                    </p>
                    <p className="text-2xl font-bold text-red-400 mb-6">
                        {selectedPlayerData?.name}?
                    </p>
                    <p className="text-slate-400 text-sm mb-6">
                        This cannot be undone
                    </p>
                    <div className="flex gap-3">
                        <Button
                            onClick={() => setShowConfirmModal(false)}
                            variant="secondary"
                            fullWidth
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleEliminate} variant="danger" fullWidth>
                            Eliminate
                        </Button>
                    </div>
                </div>
            </Modal>

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

export default DirectElimination;
