const PageHeader = ({ 
    title, 
    subtitle, 
    children,  // For action buttons
    className = '',
}) => {
    return (
        <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${className}`}>
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{title}</h1>
                {subtitle && <p className="text-gray-500 mt-1">{subtitle}</p>}
            </div>
            {children && (
                <div className="flex items-center gap-3">
                    {children}
                </div>
            )}
        </div>
    );
};

export default PageHeader;
