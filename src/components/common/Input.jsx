import { forwardRef } from 'react';

const Input = forwardRef(({ 
    type = 'text',
    label, 
    id, 
    error,
    helperText,
    className = '', 
    labelClassName = '',
    containerClassName = '',
    labelRight,
    leftIcon,
    rightIcon,
    ...props 
}, ref) => {
    return (
        <div className={`space-y-1.5 ${containerClassName}`}>
            {(label || labelRight) && (
                <div className="flex justify-between items-center ml-1">
                    {label && (
                        <label 
                            htmlFor={id} 
                            className={`text-sm font-semibold text-gray-700 ${labelClassName}`}
                        >
                            {label}
                        </label>
                    )}
                    {labelRight}
                </div>
            )}
            
            <div className="relative group">
                {leftIcon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors pointer-events-none">
                        {leftIcon}
                    </div>
                )}
                
                <input 
                    ref={ref}
                    type={type}
                    id={id}
                    className={`
                        w-full 
                        ${leftIcon ? 'pl-10' : 'pl-4'} 
                        ${rightIcon ? 'pr-10' : 'pr-4'} 
                        py-2.5 
                        bg-white 
                        border border-gray-200 
                        rounded-xl 
                        text-gray-900 
                        placeholder-gray-400 
                        focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 
                        disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-100 disabled:cursor-not-allowed
                        transition-all duration-200 
                        font-medium
                        shadow-sm
                        ${error ? 'border-red-300 focus:ring-red-100 focus:border-red-500' : ''}
                        ${className}
                    `}
                    {...props}
                />

                {rightIcon && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        {rightIcon}
                    </div>
                )}
            </div>

            {(error || helperText) && (
                <p className={`text-xs ml-1 ${error ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
                    {error || helperText}
                </p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
