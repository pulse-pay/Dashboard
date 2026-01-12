const variants = {
    success: 'bg-green-50 text-green-700 border-green-100',
    warning: 'bg-yellow-50 text-yellow-700 border-yellow-100',
    error: 'bg-red-50 text-red-700 border-red-100',
    info: 'bg-blue-50 text-blue-700 border-blue-100',
    default: 'bg-gray-100 text-gray-600 border-gray-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-100',
};

const dotColors = {
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    default: 'bg-gray-400',
    purple: 'bg-purple-500',
};

const StatusBadge = ({ 
    children, 
    variant = 'default', 
    showDot = true,
    pulse = false,
    size = 'sm',
    className = '',
}) => {
    const sizeClasses = {
        xs: 'px-2 py-0.5 text-xs',
        sm: 'px-2.5 py-1 text-xs',
        md: 'px-3 py-1.5 text-sm',
    };

    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full font-semibold border ${variants[variant]} ${sizeClasses[size]} ${className}`}>
            {showDot && (
                <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]} ${pulse ? 'animate-pulse' : ''}`} />
            )}
            {children}
        </span>
    );
};

export default StatusBadge;
