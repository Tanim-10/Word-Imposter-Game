// Modal Component
const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    showCloseButton = true,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="relative bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in">
                {/* Header */}
                {(title || showCloseButton) && (
                    <div className="flex items-center justify-between p-6 border-b border-slate-700">
                        {title && (
                            <h2 className="text-xl font-bold text-white">{title}</h2>
                        )}
                        {showCloseButton && (
                            <button
                                onClick={onClose}
                                className="w-8 h-8 rounded-full bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-white flex items-center justify-center transition-colors"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                )}

                {/* Body */}
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
