// Player Card Component
const PlayerCard = ({
    player,
    onRemove,
    showRemove = false,
    isVotable = false,
    onVote,
    isSelected = false,
    disabled = false,
    showRole = false,
}) => {
    const handleClick = () => {
        if (isVotable && onVote && !disabled) {
            onVote(player.id);
        }
    };

    return (
        <div
            onClick={handleClick}
            className={`
        relative flex items-center gap-4 p-4 rounded-xl transition-all duration-200
        ${isVotable && !disabled ? 'cursor-pointer hover:bg-slate-700/50' : ''}
        ${isSelected ? 'bg-violet-600/30 border-2 border-violet-500' : 'bg-slate-800/50 border border-slate-700'}
        ${disabled ? 'opacity-50' : ''}
      `}
        >
            {/* Porfile */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                {player.name.charAt(0).toUpperCase()}
            </div>

            {/* Name */}
            <div className="flex-1">
                <p className="text-white font-medium text-lg">{player.name}</p>
                {showRole && (
                    <p className={`text-sm ${player.isImposter ? 'text-red-400' : 'text-green-400'}`}>
                        {player.isImposter ? '🎭 Imposter' : '✓ Civilian'}
                    </p>
                )}
            </div>

            {/* Remove Button */}
            {showRemove && onRemove && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove(player.id);
                    }}
                    className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 flex items-center justify-center transition-colors"
                >
                    ✕
                </button>
            )}

            {/* Vote Indicator */}
            {isSelected && (
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                </div>
            )}
        </div>
    );
};

export default PlayerCard;
