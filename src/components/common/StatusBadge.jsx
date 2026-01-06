const StatusBadge = ({ status }) => {
  const statusConfig = {
    Active: 'bg-green-100 text-success',
    Inactive: 'bg-gray-100 text-text-secondary',
    Completed: 'bg-green-100 text-success',
    Pending: 'bg-yellow-100 text-warning',
    completed: 'bg-green-100 text-success',
  };

  const className = statusConfig[status] || statusConfig.Inactive;

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${className}`}>
      {status}
    </span>
  );
};

export default StatusBadge;

