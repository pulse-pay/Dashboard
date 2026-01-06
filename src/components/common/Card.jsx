const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-surface rounded-lg shadow-sm border border-border ${className}`}>
      {children}
    </div>
  );
};

export default Card;

