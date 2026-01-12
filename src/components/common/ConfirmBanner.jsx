import { Loader2 } from 'lucide-react';
import Button from './Button';

const ConfirmBanner = ({
    icon: Icon,
    title,
    description,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    onConfirm,
    onCancel,
    isLoading = false,
    variant = 'danger', // danger, warning, info
    className = '',
}) => {
    const variants = {
        danger: {
            bg: 'bg-red-50 border-red-200',
            iconBg: 'bg-red-100',
            iconColor: 'text-red-600',
            confirmBg: 'bg-red-600 hover:bg-red-700',
        },
        warning: {
            bg: 'bg-yellow-50 border-yellow-200',
            iconBg: 'bg-yellow-100',
            iconColor: 'text-yellow-600',
            confirmBg: 'bg-yellow-600 hover:bg-yellow-700',
        },
        info: {
            bg: 'bg-blue-50 border-blue-200',
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-600',
            confirmBg: 'bg-blue-600 hover:bg-blue-700',
        },
    };

    const v = variants[variant];

    return (
        <div className={`${v.bg} border rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
            <div className="flex items-center gap-4">
                {Icon && (
                    <div className={`w-12 h-12 rounded-xl ${v.iconBg} flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${v.iconColor}`} />
                    </div>
                )}
                <div>
                    <p className="font-semibold text-gray-900">{title}</p>
                    {description && <p className="text-sm text-gray-600">{description}</p>}
                </div>
            </div>
            <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" onClick={onCancel}>
                    {cancelLabel}
                </Button>
                <button
                    onClick={onConfirm}
                    disabled={isLoading}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors disabled:opacity-50 ${v.confirmBg}`}
                >
                    {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                    {confirmLabel}
                </button>
            </div>
        </div>
    );
};

export default ConfirmBanner;
