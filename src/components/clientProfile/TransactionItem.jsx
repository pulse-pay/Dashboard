import StatusBadge from '../common/StatusBadge';

const TransactionItem = ({ transaction }) => {
  const { description, date, amount, status } = transaction;

  return (
    <div className="px-6 py-4 hover:bg-background transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-text">{description}</p>
          <p className="text-sm text-text-secondary">{date}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold text-text">{amount}</p>
          <StatusBadge status={status} />
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;

