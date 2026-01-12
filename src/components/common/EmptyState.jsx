import Button from './Button';

const EmptyState = ({ 
    icon: Icon, 
    title, 
    description, 
    actionLabel, 
    onAction,
    className = '',
}) => {
    return (
        <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center ${className}`}>
            {Icon && (
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                    <Icon className="w-10 h-10 text-blue-500" />
                </div>
            )}
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            {description && (
                <p className="text-gray-500 mb-8 max-w-md mx-auto">{description}</p>
            )}
            {actionLabel && onAction && (
                <Button onClick={onAction} variant="primary" size="lg">
                    {actionLabel}
                </Button>
            )}
        </div>
    );
};

export default EmptyState;
