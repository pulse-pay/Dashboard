const Input = ({ 
    type = 'text',
    label, 
    id, 
    className = '', 
    labelClassName = '',
    containerClassName = '',
    labelRight,
    ...props 
}) => {
    return (
        <div className={`space-y-2 ${containerClassName}`}>
            {(label || labelRight) && (
                <div className="flex justify-between items-center ml-1">
                    {label && (
                        <label 
                            htmlFor={id} 
                            className={`text-sm font-medium text-blue-50 ${labelClassName}`}
                        >
                            {label}
                        </label>
                    )}
                    {labelRight}
                </div>
            )}
            <input 
                type={type}
                id={id}
                className={`w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/20 transition-all duration-200 ${className}`}
                {...props}
            />
        </div>
    );
};

export default Input;
