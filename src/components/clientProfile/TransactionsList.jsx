import Card from '../common/Card';
import TransactionItem from './TransactionItem';

const TransactionsList = ({ transactions }) => {
  return (
    <Card className="overflow-hidden">
      <div className="px-6 py-4 border-b border-border bg-background">
        <h2 className="text-lg font-semibold text-text">Transaction History</h2>
      </div>
      <div className="divide-y divide-border">
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </Card>
  );
};

export default TransactionsList;

