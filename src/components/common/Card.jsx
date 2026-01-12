const Card = ({ 
    children, 
    className = '', 
    padding = 'p-6',
    hover = false,
    onClick,
    ...props 
}) => {
    const hoverClasses = hover ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' : '';
    
    return (
        <div 
            className={`bg-white rounded-2xl shadow-sm border border-gray-100 ${padding} ${hoverClasses} transition-all duration-300 ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
