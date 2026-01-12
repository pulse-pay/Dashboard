import { useState, useEffect, useRef } from 'react';
import { ArrowDownLeft, ArrowUpRight, Download, Copy, Check, Clock, RefreshCw } from 'lucide-react';
import { PageHeader, StatusBadge, SearchBar, Card, Button } from '../components/common';

const TYPE_FILTERS = [
  { value: 'all', label: 'All Types' },
  { value: 'incoming', label: 'Incoming' },
  { value: 'outgoing', label: 'Outgoing' },
  { value: 'refund', label: 'Refund' },
];

const TIME_FILTERS = [
  { value: '30days', label: 'Last 30 Days' },
  { value: 'week', label: 'This Week' },
  { value: 'today', label: 'Today' },
];

// Dummy transactions defined outside component to avoid re-creation
const DUMMY_TRANSACTIONS = [
  {
    id: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2',
    date: 'Today, 2:32 PM',
    amount: 125.00,
    type: 'incoming',
    client: 'John Doe',
    status: 'completed',
    method: 'Credit Card'
  },
  {
    id: '0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3',
    date: 'Today, 1:15 PM',
    amount: 89.50,
    type: 'incoming',
    client: 'Jane Smith',
    status: 'completed',
    method: 'PayPal'
  },
  {
    id: '0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4',
    date: 'Today, 12:08 PM',
    amount: 250.00,
    type: 'incoming',
    client: 'Bob Johnson',
    status: 'processing',
    method: 'Bank Transfer'
  },
  {
    id: '0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5',
    date: 'Yesterday, 11:45 AM',
    amount: 45.00,
    type: 'refund',
    client: 'Alice Williams',
    status: 'completed',
    method: 'Credit Card'
  },
  {
    id: '0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6',
    date: 'Yesterday, 10:22 AM',
    amount: 199.99,
    type: 'incoming',
    client: 'Charlie Brown',
    status: 'failed',
    method: 'Credit Card'
  },
  {
    id: '0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e7',
    date: 'Yesterday, 10:22 AM',
    amount: 499.99,
    type: 'incoming',
    client: 'Charlie Brown',
    status: 'failed',
    method: 'Credit Card'
  },
  {
    id: '0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e8',
    date: 'Yesterday, 10:22 AM',
    amount: 199.99,
    type: 'incoming',
    client: 'Charlie Brown',
    status: 'Completed',
    method: 'Credit Card'
  },
  {
    id: '0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e9',
    date: 'Yesterday, 10:22 AM',
    amount: 1.20,
    type: 'incoming',
    client: 'Charlie Brown',
    status: 'failed',
    method: 'Credit Card'
  },
];

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedHash, setCopiedHash] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [typeFilter, setTypeFilter] = useState('all');
  const indexRef = useRef(0);

  // Add transactions one by one with 500ms gap
  useEffect(() => {
    const interval = setInterval(() => {
      if (indexRef.current < DUMMY_TRANSACTIONS.length) {
        setTransactions(prev => [...prev, DUMMY_TRANSACTIONS[indexRef.current]]);
        indexRef.current++;
      } else {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(text);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const formatHash = (hash) => {
    return `${hash.substring(0, 8)}...${hash.substring(hash.length - 8)}`;
  };

  return (
    <div className="space-y-8">
      <PageHeader title="Transactions" subtitle="Real-time financial ledger and payment status">
        <Button variant="outline">
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
        <Button variant="primary">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </PageHeader>

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search by transaction ID or client..."
        filters={TYPE_FILTERS}
        selectedFilter={typeFilter}
        onFilterChange={setTypeFilter}
      />

      <Card padding="p-0" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Method</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((tx, i) => {
                const statusVariant = tx.status === 'completed' ? 'success' : tx.status === 'processing' ? 'info' : 'error';
                return (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 group-hover:text-blue-600 transition-colors">
                        <span className="font-mono text-sm text-gray-600">{formatHash(tx.id)}</span>
                        <button onClick={() => copyToClipboard(tx.id)} className="text-gray-400 hover:text-blue-600 transition-colors">
                          {copiedHash === tx.id ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">{tx.client}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-500">{tx.date}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`flex items-center gap-1 font-semibold text-sm ${tx.type === 'refund' || tx.type === 'outgoing' ? 'text-gray-900' : 'text-green-600'}`}>
                        {tx.type === 'refund' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
                        {tx.type === 'refund' ? '-' : '+'}₹{tx.amount.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge variant={statusVariant} pulse={tx.status === 'processing'}>
                        {tx.status}
                      </StatusBadge>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-500">{tx.method}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Transactions;
