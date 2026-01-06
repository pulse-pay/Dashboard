import { useState, useEffect } from 'react';
import { ArrowDown, ExternalLink, Copy, CheckCircle } from 'lucide-react';

const Transactions = () => {
  const [transactions, setTransactions] = useState([
    {
      id: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2',
      date: '2024-01-15 14:32:18',
      amount: '+$125.00',
      type: 'incoming',
      customerId: 'CUST-001',
      status: 'completed',
    },
    {
      id: '0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3',
      date: '2024-01-15 13:15:42',
      amount: '+$89.50',
      type: 'incoming',
      customerId: 'CUST-002',
      status: 'completed',
    },
    {
      id: '0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4',
      date: '2024-01-15 12:08:25',
      amount: '+$250.00',
      type: 'incoming',
      customerId: 'CUST-003',
      status: 'completed',
    },
    {
      id: '0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5',
      date: '2024-01-15 11:45:10',
      amount: '+$45.00',
      type: 'incoming',
      customerId: 'CUST-004',
      status: 'completed',
    },
    {
      id: '0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6',
      date: '2024-01-15 10:22:33',
      amount: '+$199.99',
      type: 'incoming',
      customerId: 'CUST-005',
      status: 'completed',
    },
  ]);

  const [copiedHash, setCopiedHash] = useState(null);

  // Simulate live updates - new transaction every 2-3 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      const newTransaction = {
        id: `0x${Math.random().toString(16).substr(2, 64)}`,
        date: new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
        amount: `+$${(Math.random() * 200 + 20).toFixed(2)}`,
        type: 'incoming',
        customerId: `CUST-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
        status: 'completed',
      };

      setTransactions((prev) => [newTransaction, ...prev]);
    }, 120000); // 2 minutes

    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(text);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const formatHash = (hash) => {
    return `${hash.substring(0, 10)}...${hash.substring(hash.length - 10)}`;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-text">Transactions</h1>
        <p className="text-text-secondary mt-2">Global transaction ledger - Blockchain transactions</p>
      </div>

      <div className="bg-surface rounded-lg shadow-sm border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-background">
          <h2 className="text-lg font-semibold text-text">Transaction History</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Transaction Hash
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Customer ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-surface divide-y divide-border">
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="hover:bg-background transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono text-text">
                        {formatHash(transaction.id)}
                      </span>
                      <button
                        onClick={() => copyToClipboard(transaction.id)}
                        className="p-1 hover:bg-background rounded transition-colors"
                        title="Copy hash"
                      >
                        {copiedHash === transaction.id ? (
                          <CheckCircle className="w-4 h-4 text-success" />
                        ) : (
                          <Copy className="w-4 h-4 text-text-secondary" />
                        )}
                      </button>
                      <a
                        href={`https://etherscan.io/tx/${transaction.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 hover:bg-background rounded transition-colors"
                        title="View on blockchain explorer"
                      >
                        <ExternalLink className="w-4 h-4 text-text-secondary" />
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-text">{transaction.date}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <ArrowDown className="w-4 h-4 text-success" />
                      <span className="text-sm font-semibold text-success">
                        {transaction.amount}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-mono text-text">
                      {transaction.customerId}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-success">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {transactions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-olive">No transactions yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;
