const variants = {
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
    red: 'bg-red-50 text-red-600',
    gray: 'bg-gray-50 text-gray-600',
    gradient: 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25',
};

const sizes = {
    sm: 'p-2',
    md: 'p-2.5',
    lg: 'p-3',
    xl: 'p-4',
};

const IconBox = ({ 
    icon: Icon, 
    variant = 'blue', 
    size = 'md',
    iconSize,
    className = '',
}) => {
    const iconSizes = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
        xl: 'w-8 h-8',
    };

    return (
        <div className={`rounded-xl ${variants[variant]} ${sizes[size]} ${className}`}>
            <Icon className={iconSize || iconSizes[size]} />
        </div>
    );
};

export default IconBox;
