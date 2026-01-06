const Button = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  className = '',
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'px-4 py-2 rounded-lg transition-colors font-medium text-sm';
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-dark shadow-sm',
    secondary: 'bg-background text-text hover:bg-border border border-border',
    danger: 'bg-error text-white hover:bg-red-600 shadow-sm',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

