import { useState, useEffect } from 'react';
import { ArrowDownLeft, ArrowUpRight, Search, Filter, Download, Copy, Check, Clock, RefreshCw } from 'lucide-react';

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedHash, setCopiedHash] = useState(null);
  const [transactions, setTransactions] = useState([
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
  ]);

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
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Transactions</h1>
          <p className="text-gray-500 mt-1">Real-time financial ledger and payment status</p>
        </div>
        <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
               <RefreshCw className="w-4 h-4" />
               Refresh
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200">
               <Download className="w-4 h-4" />
               Export CSV
            </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
         <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
                type="text"
                placeholder="Search by transaction ID or client..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder-gray-400 text-gray-700"
            />
         </div>
         
         <div className="flex items-center gap-3 w-full md:w-auto">
             <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl border border-gray-200">
                 <Filter className="w-4 h-4 text-gray-500" />
                 <select className="bg-transparent border-none text-sm font-medium text-gray-700 focus:ring-0 cursor-pointer">
                     <option>All Types</option>
                     <option>Incoming</option>
                     <option>Outgoing</option>
                     <option>Refund</option>
                 </select>
             </div>
             <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl border border-gray-200">
                 <Clock className="w-4 h-4 text-gray-500" />
                 <select className="bg-transparent border-none text-sm font-medium text-gray-700 focus:ring-0 cursor-pointer">
                     <option>Last 30 Days</option>
                     <option>This Week</option>
                     <option>Today</option>
                 </select>
             </div>
         </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
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
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 group-hover:text-blue-600 transition-colors">
                      <span className="font-mono text-sm text-gray-600">{formatHash(tx.id)}</span>
                      <button 
                        onClick={() => copyToClipboard(tx.id)}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                      >
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
                    <div className={`flex items-center gap-1 font-semibold text-sm ${
                        tx.type === 'refund' || tx.type === 'outgoing' ? 'text-gray-900' : 'text-green-600'
                    }`}>
                        {tx.type === 'refund' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
                        {tx.type === 'refund' ? '-' : '+'}${tx.amount.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                        tx.status === 'completed' ? 'bg-green-50 text-green-700 border border-green-100' :
                        tx.status === 'processing' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                        'bg-red-50 text-red-700 border border-red-100'
                    }`}>
                        {tx.status === 'completed' && <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></div>}
                        {tx.status === 'processing' && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5 animate-pulse"></div>}
                        {tx.status === 'failed' && <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5"></div>}
                        {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-500">{tx.method}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
