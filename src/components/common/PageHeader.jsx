const PageHeader = ({ title, description, actionButton }) => {
  return (
    <div className={`flex items-center justify-between mb-6 ${!actionButton ? 'mb-6' : ''}`}>
      <div>
        <h1 className="text-2xl font-bold text-text">{title}</h1>
        {description && <p className="text-text-secondary mt-1">{description}</p>}
      </div>
      {actionButton && <div>{actionButton}</div>}
    </div>
  );
};

export default PageHeader;

