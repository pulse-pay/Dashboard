import { Link } from 'react-router-dom';
import { Search, Plus, Filter, MoreHorizontal, Eye, EyeOff, Phone, Mail, Calendar, User } from 'lucide-react';
import { useState } from 'react';

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [revealedIds, setRevealedIds] = useState(new Set());
  const [selectedStatus, setSelectedStatus] = useState('All');

  const clientsData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 (555) 123-4567', status: 'Active', joinDate: 'Jan 15, 2024', avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=2563eb&color=fff' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1 (555) 234-5678', status: 'Active', joinDate: 'Jan 10, 2024', avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=db2777&color=fff' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '+1 (555) 345-6789', status: 'Inactive', joinDate: 'Dec 20, 2023', avatar: 'https://ui-avatars.com/api/?name=Bob+Johnson&background=4b5563&color=fff' },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', phone: '+1 (555) 456-7890', status: 'Active', joinDate: 'Jan 5, 2024', avatar: 'https://ui-avatars.com/api/?name=Alice+Williams&background=059669&color=fff' },
    { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', phone: '+1 (555) 567-8901', status: 'Active', joinDate: 'Dec 28, 2023', avatar: 'https://ui-avatars.com/api/?name=Charlie+Brown&background=d97706&color=fff' },
    { id: 6, name: 'Diana Prince', email: 'diana@example.com', phone: '+1 (555) 678-9012', status: 'Inactive', joinDate: 'Dec 15, 2023', avatar: 'https://ui-avatars.com/api/?name=Diana+Prince&background=7c3aed&color=fff' },
  ];

  const filteredClients = clientsData.filter((client) => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || client.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const toggleReveal = (id) => {
    const newRevealed = new Set(revealedIds);
    if (newRevealed.has(id)) {
        newRevealed.delete(id);
    } else {
        newRevealed.add(id);
    }
    setRevealedIds(newRevealed);
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Client Management</h1>
          <p className="text-gray-500 mt-1">Manage your customer base and view detailed profiles</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-sm shadow-blue-200">
            <Plus className="w-4 h-4" />
            Add New Client
        </button>
      </div>

      {/* Controls Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
         <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
                type="text"
                placeholder="Search clients..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder-gray-400 text-gray-700"
            />
         </div>
         
         <div className="flex items-center gap-2 w-full md:w-auto">
             <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl border border-gray-200">
                 <Filter className="w-4 h-4 text-gray-500" />
                 <select 
                    className="bg-transparent border-none text-sm font-medium text-gray-700 focus:ring-0 cursor-pointer"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                 >
                     <option value="All">All Status</option>
                     <option value="Active">Active</option>
                     <option value="Inactive">Inactive</option>
                 </select>
             </div>
         </div>
      </div>

      {/* Clients List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
         <div className="overflow-x-auto">
             <table className="w-full text-left">
                 <thead>
                     <tr className="bg-gray-50/50 border-b border-gray-100">
                         <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</th>
                         <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact Info</th>
                         <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                         <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
                         <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                     </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                     {filteredClients.map((client) => (
                         <tr key={client.id} className="hover:bg-gray-50/50 transition-colors group">
                             <td className="px-6 py-4">
                                 <div className="flex items-center gap-3">
                                     <img src={client.avatar} alt={client.name} className="w-10 h-10 rounded-full bg-gray-200 object-cover" />
                                     <div>
                                         <p className="font-semibold text-gray-900">{client.name}</p>
                                         <p className="text-xs text-gray-500">ID: #{1000 + client.id}</p>
                                     </div>
                                 </div>
                             </td>
                             <td className="px-6 py-4">
                                 <div className="space-y-1">
                                     <div className="flex items-center gap-2 text-sm text-gray-600">
                                         <Mail className="w-3.5 h-3.5 text-gray-400" />
                                         <span className={!revealedIds.has(client.id) ? 'blur-sm select-none' : ''}>
                                             {revealedIds.has(client.id) ? client.email : '••••••••••••'}
                                         </span>
                                     </div>
                                     <div className="flex items-center gap-2 text-sm text-gray-600">
                                         <Phone className="w-3.5 h-3.5 text-gray-400" />
                                         <span className={!revealedIds.has(client.id) ? 'blur-sm select-none' : ''}>
                                             {revealedIds.has(client.id) ? client.phone : '••••••••••'}
                                         </span>
                                     </div>
                                 </div>
                             </td>
                             <td className="px-6 py-4">
                                 <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                     client.status === 'Active' 
                                     ? 'bg-green-50 text-green-700 border border-green-100' 
                                     : 'bg-gray-100 text-gray-600 border border-gray-200'
                                 }`}>
                                     <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${client.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                                     {client.status}
                                 </span>
                             </td>
                             <td className="px-6 py-4">
                                 <div className="flex items-center gap-2 text-sm text-gray-500">
                                     <Calendar className="w-4 h-4 text-gray-400" />
                                     {client.joinDate}
                                 </div>
                             </td>
                             <td className="px-6 py-4 text-right">
                                 <div className="flex items-center justify-end gap-2">
                                     <button 
                                        onClick={() => toggleReveal(client.id)}
                                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                        title="Toggle Sensitive Info"
                                     >
                                         {revealedIds.has(client.id) ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                     </button>
                                     <Link 
                                        to={`/clients/${client.id}`}
                                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                        title="View Profile"
                                     >
                                         <User className="w-4 h-4" />
                                     </Link>
                                     <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                                         <MoreHorizontal className="w-4 h-4" />
                                     </button>
                                 </div>
                             </td>
                         </tr>
                     ))}
                 </tbody>
             </table>
         </div>
         
         {filteredClients.length === 0 && (
            <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">No clients found</h3>
                <p className="text-gray-500 mt-1">Try adjusting your search or filters</p>
            </div>
         )}
      </div>
    </div>
  );
};

export default Clients;

