import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Mail, Phone, Building, MapPin, Calendar, 
  ArrowLeft, CreditCard, FileText, Activity, 
  MessageSquare, MoreHorizontal, Download, 
  CheckCircle, Clock, Shield, Star
} from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ClientProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Enhanced Client Mock Data
  const client = {
    id: id,
    name: 'John Doe',
    email: 'john.doe@acmecorp.com',
    phone: '+1 (555) 123-4567',
    company: 'Acme Corporation',
    position: 'Chief Technology Officer',
    location: 'San Francisco, CA',
    joinDate: 'Jan 15, 2023',
    status: 'Active',
    tier: 'Premium',
    totalSpend: '$45,231.00',
    lastActive: '2 hours ago',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=2563eb&color=fff&size=128'
  };

  const transactions = [
    { id: 1, date: 'Jan 15, 2024', amount: 1250.00, description: 'Enterprise Monthly Subscription', status: 'Completed', invoice: '#INV-2024-001' },
    { id: 2, date: 'Jan 10, 2024', amount: 500.00, description: 'Consultation Fee', status: 'Completed', invoice: '#INV-2024-002' },
    { id: 3, date: 'Jan 05, 2024', amount: 2000.00, description: 'Q1 Service Retainer', status: 'Pending', invoice: '#INV-2024-003' },
    { id: 4, date: 'Dec 01, 2023', amount: 1250.00, description: 'Enterprise Monthly Subscription', status: 'Completed', invoice: '#INV-2023-012' },
    { id: 5, date: 'Nov 01, 2023', amount: 1250.00, description: 'Enterprise Monthly Subscription', status: 'Completed', invoice: '#INV-2023-011' },
  ];

  const activityLog = [
    { id: 1, type: 'payment', title: 'Payment Successful', desc: 'Processed $1,250.00 for Jan Subscription', time: '2 days ago', icon: CheckCircle, color: 'text-green-600 bg-green-50' },
    { id: 2, type: 'note', title: 'Note Added', desc: 'Meeting scheduled for Q2 pipeline review', time: '1 week ago', icon: FileText, color: 'text-blue-600 bg-blue-50' },
    { id: 3, type: 'system', title: 'System Alert', desc: 'Usage limit reached 80%', time: '2 weeks ago', icon: Shield, color: 'text-yellow-600 bg-yellow-50' },
  ];

  // Spending Graph Data
  const spendingData = [
      { month: 'Aug', amount: 1250 },
      { month: 'Sep', amount: 1250 },
      { month: 'Oct', amount: 2000 },
      { month: 'Nov', amount: 1250 },
      { month: 'Dec', amount: 3500 },
      { month: 'Jan', amount: 3750 },
  ];

  return (
    <div className="space-y-6">
       {/* Navigation Header */}
       <div className="flex items-center gap-4">
           <button 
             onClick={() => navigate('/clients')} 
             className="p-2 hover:bg-white rounded-xl text-gray-500 hover:text-gray-900 transition-colors"
           >
               <ArrowLeft className="w-5 h-5" />
           </button>
           <h1 className="text-2xl font-bold text-gray-900">Client Profile</h1>
       </div>

       {/* Profile Header Card */}
       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
           {/* Cover Gradient */}
           <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
           </div>
           
           <div className="px-8 pb-8">
               <div className="flex flex-col md:flex-row items-start justify-between relative">
                   {/* Avatar & Basic Info */}
                   <div className="flex items-end gap-6 -mt-10 mb-6 md:mb-0">
                       <img 
                         src={client.avatar} 
                         alt={client.name} 
                         className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg bg-white"
                       />
                       <div className="mb-2">
                           <h2 className="text-2xl font-bold text-gray-900">{client.name}</h2>
                           <div className="flex items-center gap-2 text-gray-500 text-sm">
                               <Building className="w-4 h-4" />
                               <span>{client.position} at {client.company}</span>
                           </div>
                       </div>
                   </div>

                   {/* Action Buttons */}
                   <div className="flex items-center gap-3 mt-4 md:mt-0">
                       <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
                           <MessageSquare className="w-4 h-4" />
                           Message
                       </button>
                       <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200">
                           <CreditCard className="w-4 h-4" />
                           Create Invoice
                       </button>
                       <button className="p-2 bg-white border border-gray-200 text-gray-500 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
                           <MoreHorizontal className="w-4 h-4" />
                       </button>
                   </div>
               </div>

               {/* Stats Grid */}
               <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8 pt-8 border-t border-gray-100">
                   <div className="space-y-1">
                       <p className="text-sm font-medium text-gray-500">Total Spend</p>
                       <p className="text-xl font-bold text-gray-900">{client.totalSpend}</p>
                   </div>
                   <div className="space-y-1">
                       <p className="text-sm font-medium text-gray-500">Last Active</p>
                       <p className="text-xl font-bold text-gray-900">{client.lastActive}</p>
                   </div>
                   <div className="space-y-1">
                       <p className="text-sm font-medium text-gray-500">Tier</p>
                       <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                           <Star className="w-3 h-3 mr-1 fill-current" />
                           {client.tier}
                       </span>
                   </div>
                   <div className="space-y-1">
                       <p className="text-sm font-medium text-gray-500">Status</p>
                       <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                           <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></div>
                           {client.status}
                       </span>
                   </div>
               </div>
           </div>
       </div>

       {/* Tabs & Content */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Left Column: Details & Tabs */}
           <div className="lg:col-span-2 space-y-6">
                {/* Custom Tabs */}
               <div className="flex items-center gap-1 p-1 bg-white rounded-xl border border-gray-200 w-fit">
                   {['overview', 'transactions', 'notes'].map((tab) => (
                       <button
                         key={tab}
                         onClick={() => setActiveTab(tab)}
                         className={`px-4 py-2 text-sm font-medium rounded-lg capitalize transition-all ${
                             activeTab === tab 
                             ? 'bg-gray-100 text-gray-900 shadow-sm' 
                             : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                         }`}
                       >
                           {tab}
                       </button>
                   ))}
               </div>

               {activeTab === 'overview' && (
                   <div className="space-y-6">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           {/* Contact Info */}
                           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                               <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Details</h3>
                               <div className="space-y-4">
                                   <div className="flex items-center gap-4">
                                       <div className="p-2 bg-gray-50 rounded-lg text-gray-500">
                                           <Mail className="w-4 h-4" />
                                       </div>
                                       <div>
                                           <p className="text-xs text-gray-500">Email Address</p>
                                           <p className="text-sm font-medium text-gray-900">{client.email}</p>
                                       </div>
                                   </div>
                                   <div className="flex items-center gap-4">
                                       <div className="p-2 bg-gray-50 rounded-lg text-gray-500">
                                           <Phone className="w-4 h-4" />
                                       </div>
                                       <div>
                                           <p className="text-xs text-gray-500">Phone Number</p>
                                           <p className="text-sm font-medium text-gray-900">{client.phone}</p>
                                       </div>
                                   </div>
                                   <div className="flex items-center gap-4">
                                       <div className="p-2 bg-gray-50 rounded-lg text-gray-500">
                                           <MapPin className="w-4 h-4" />
                                       </div>
                                       <div>
                                           <p className="text-xs text-gray-500">Location</p>
                                           <p className="text-sm font-medium text-gray-900">{client.location}</p>
                                       </div>
                                   </div>
                               </div>
                           </div>
                           
                           {/* Spend Chart */}
                           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                               <h3 className="text-lg font-bold text-gray-900 mb-4">Spending Trend</h3>
                               <div className="h-48 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={spendingData}>
                                            <defs>
                                                <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                                                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <Tooltip 
                                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                itemStyle={{ fontSize: '12px' }}
                                            />
                                            <XAxis dataKey="month" hide />
                                            <Area 
                                                type="monotone" 
                                                dataKey="amount" 
                                                stroke="#2563eb" 
                                                strokeWidth={2}
                                                fillOpacity={1} 
                                                fill="url(#colorSpend)" 
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                               </div>
                           </div>
                       </div>
                   </div>
               )}

               {activeTab === 'transactions' && (
                   <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                       <table className="w-full text-left">
                           <thead className="bg-gray-50 border-b border-gray-100">
                               <tr>
                                   <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Date</th>
                                   <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Description</th>
                                   <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                                   <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                                   <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-right">Invoice</th>
                               </tr>
                           </thead>
                           <tbody className="divide-y divide-gray-100">
                               {transactions.map((t) => (
                                   <tr key={t.id} className="hover:bg-gray-50/50">
                                       <td className="px-6 py-4 text-sm text-gray-600">{t.date}</td>
                                       <td className="px-6 py-4 text-sm font-medium text-gray-900">{t.description}</td>
                                       <td className="px-6 py-4 text-sm font-medium text-gray-900">${t.amount.toFixed(2)}</td>
                                       <td className="px-6 py-4">
                                           <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                               t.status === 'Completed' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
                                           }`}>
                                               {t.status}
                                           </span>
                                       </td>
                                       <td className="px-6 py-4 text-right">
                                           <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1 justify-end ml-auto">
                                               <Download className="w-3 h-3" />
                                               Download
                                           </button>
                                       </td>
                                   </tr>
                               ))}
                           </tbody>
                       </table>
                   </div>
               )}
           </div>

           {/* Right Column: Activity Timeline */}
           <div className="space-y-6">
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                   <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                       <Activity className="w-5 h-5 text-gray-400" />
                       Activity Log
                   </h3>
                   <div className="relative border-l border-gray-200 ml-3 space-y-8">
                       {activityLog.map((log) => {
                           const Icon = log.icon;
                           return (
                               <div key={log.id} className="relative pl-8">
                                   <span className={`absolute -left-4 top-0 p-1.5 rounded-full border-2 border-white ${log.color}`}>
                                       <Icon className="w-3.5 h-3.5" />
                                   </span>
                                   <div>
                                       <p className="text-sm font-semibold text-gray-900">{log.title}</p>
                                       <p className="text-sm text-gray-500 mt-1">{log.desc}</p>
                                       <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                                           <Clock className="w-3 h-3" />
                                           {log.time}
                                       </p>
                                   </div>
                               </div>
                           );
                       })}
                   </div>
                   <button className="w-full py-2 mt-8 text-sm text-gray-500 font-medium hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                       View All History
                   </button>
               </div>
           </div>
       </div>
    </div>
  );
};

export default ClientProfile;
