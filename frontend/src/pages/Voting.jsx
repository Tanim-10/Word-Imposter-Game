import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import PlayerCard from "../components/PlayerCard";
import Modal from "../components/Modal";
import { useGame } from "../context/GameContext";

const Voting = () => {
    const navigate = useNavigate();
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showQuitModal, setShowQuitModal] = useState(false);

    const {
        players,
        getActivePlayers,
        currentPlayerIndex,
        nextPlayer,
        castVote,
        eliminatePlayer,
        resetGame,
        votes,
        roundNumber,
    } = useGame();

    const activePlayers = getActivePlayers();
    const currentVoter = activePlayers[currentPlayerIndex];
    const isLastVoter = currentPlayerIndex === activePlayers.length - 1;

    const handleSelectPlayer = (playerId) => {
        if (playerId === currentVoter?.id) return; // No self-voting
        setSelectedPlayer(playerId);
    };

    const handleConfirmVote = () => {
        setShowConfirmModal(true);
    };

    const handleVote = () => {
        castVote(currentVoter.id, selectedPlayer);
        setShowConfirmModal(false);
        setSelectedPlayer(null);

        if (isLastVoter) {
            // Tally votes and eliminate the player with most votes
            const newVotes = { ...votes, [currentVoter.id]: selectedPlayer };
            const voteCounts = {};

            Object.values(newVotes).forEach(votedForId => {
                voteCounts[votedForId] = (voteCounts[votedForId] || 0) + 1;
            });

            // Find player with most votes
            let maxVotes = 0;
            let eliminatedId = null;

            Object.entries(voteCounts).forEach(([playerId, count]) => {
                if (count > maxVotes) {
                    maxVotes = count;
                    eliminatedId = parseInt(playerId);
                }
            });

            if (eliminatedId) {
                eliminatePlayer(eliminatedId);
            }

            navigate("/results");
        } else {
            nextPlayer();
        }
    };

    const handleQuitGame = () => {
        resetGame();
        navigate("/");
    };

    const selectedPlayerName = activePlayers.find(p => p.id === selectedPlayer)?.name;

    if (!currentVoter) return null;

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

                {/* Progress */}
                <div className="text-center mb-6 animate-fade-in">
                    <div className="flex justify-center gap-2 mb-3">
                        {activePlayers.map((player, index) => (
                            <div
                                key={player.id}
                                className={`w-3 h-3 rounded-full transition-all ${player.hasVoted
                                        ? 'bg-green-500'
                                        : index === currentPlayerIndex
                                            ? 'bg-blue-500 w-6'
                                            : 'bg-slate-700'
                                    }`}
                            />
                        ))}
                    </div>
                    <p className="text-slate-400 text-sm">
                        Vote {currentPlayerIndex + 1} of {activePlayers.length}
                    </p>
                </div>

                {/* Header */}
                <div className="text-center mb-8 animate-fade-in stagger-1">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
                        <span className="text-3xl">🗳️</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-1">
                        {currentVoter.name}'s Turn
                    </h2>
                    <p className="text-slate-400">
                        Who do you think has a different word?
                    </p>
                </div>

                {/* Player List */}
                <div className="space-y-3 mb-6 animate-fade-in stagger-2">
                    {activePlayers.map((player) => (
                        <PlayerCard
                            key={player.id}
                            player={player}
                            isVotable={player.id !== currentVoter.id}
                            onVote={handleSelectPlayer}
                            isSelected={selectedPlayer === player.id}
                            disabled={player.id === currentVoter.id}
                        />
                    ))}
                </div>

                {/* Self-vote hint */}
                <p className="text-center text-sm text-slate-500 mb-6">
                    You cannot vote for yourself
                </p>

                {/* Confirm Button */}
                <div className="animate-fade-in stagger-3">
                    <Button
                        onClick={handleConfirmVote}
                        disabled={!selectedPlayer}
                        fullWidth
                    >
                        {selectedPlayer
                            ? `Vote for ${selectedPlayerName}`
                            : 'Select a player to vote'
                        }
                    </Button>
                </div>
            </div>

            {/* Vote Confirmation Modal */}
            <Modal
                isOpen={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                title="Confirm Your Vote"
            >
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-blue-600/20 rounded-2xl flex items-center justify-center mb-4">
                        <span className="text-3xl">🎯</span>
                    </div>
                    <p className="text-white text-lg mb-2">
                        You are voting for
                    </p>
                    <p className="text-2xl font-bold text-blue-400 mb-6">
                        {selectedPlayerName}
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
                        <Button onClick={handleVote} fullWidth>
                            Confirm Vote
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

export default Voting;
