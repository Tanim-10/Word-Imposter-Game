const Button = ({
    children,
    onClick,
    variant = "primary",
    fullWidth = false,
    disabled = false,
    className = "",
}) => {
    const baseStyles = "px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform active:scale-[0.98]";

    const variants = {
        primary: `bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`,
        secondary: `bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 hover:border-slate-500`,
        danger: `bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-500/30`,
        ghost: `bg-transparent hover:bg-slate-800 text-slate-400 hover:text-white`,
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
