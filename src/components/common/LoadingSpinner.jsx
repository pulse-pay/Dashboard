import { Loader2 } from 'lucide-react';

const sizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12',
};

const LoadingSpinner = ({ 
    size = 'lg', 
    text, 
    fullScreen = false,
    className = '',
}) => {
    const content = (
        <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
            <Loader2 className={`${sizes[size]} text-blue-600 animate-spin`} />
            {text && <p className="text-gray-500 font-medium">{text}</p>}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                {content}
            </div>
        );
    }

    return content;
};

export default LoadingSpinner;
