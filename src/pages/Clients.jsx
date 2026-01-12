import { Link } from 'react-router-dom';
import { Plus, MoreHorizontal, Eye, EyeOff, Phone, Mail, Calendar, User, AlertCircle, RefreshCw, Search } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetStoreClientsQuery } from '../store/api/storeAccountApi';
import { selectClients } from '../store/slices/clientsSlice';
import { PageHeader, StatusBadge, LoadingSpinner, SearchBar, Card, Button } from '../components/common';

const STATUS_FILTERS = [
  { value: 'All', label: 'All Status' },
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
];

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [revealedIds, setRevealedIds] = useState(new Set());
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Get store ID from auth state
  const store = useSelector((state) => state.auth.store);
  const storeId = store?._id || store?.id;

  // Fetch clients from API
  const { 
    data: clientsData = [], 
    isLoading, 
    isError, 
    error,
    refetch 
  } = useGetStoreClientsQuery(storeId, {
    skip: !storeId, // Skip query if no store ID
  });

  // Get clients from Redux store (synced via extraReducers)
  const storeClients = useSelector(selectClients);

  // Use API data directly, fallback to store clients
  const clients = clientsData.length > 0 ? clientsData : storeClients;

  // Transform API data to match UI format
  const transformedClients = clients.map((client) => ({
    id: client._id || client.id,
    name: client.name || `${client.firstName || ''} ${client.lastName || ''}`.trim() || 'Unknown',
    email: client.email || 'N/A',
    phone: client.phone || client.phoneNumber || 'N/A',
    status: client.status === 'active' || client.isActive ? 'Active' : 'Inactive',
    joinDate: client.createdAt 
      ? new Date(client.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : 'N/A',
    avatar: client.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(client.name || 'User')}&background=2563eb&color=fff`,
  }));

  const filteredClients = transformedClients.filter((client) => {
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

  // Loading state
  if (isLoading) {
    return <LoadingSpinner fullScreen text="Loading clients..." />;
  }

  // Error state
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Failed to load clients</h3>
        <p className="text-gray-500 text-sm">{error?.data?.message || 'Something went wrong'}</p>
        <Button onClick={refetch} variant="primary">
          <RefreshCw className="w-4 h-4" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Client Management" 
        subtitle={`${transformedClients.length} client${transformedClients.length !== 1 ? 's' : ''} registered`}
      >
        <button 
          onClick={refetch}
          className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
          title="Refresh clients"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
        <Button variant="primary">
          <Plus className="w-4 h-4" />
          Add New Client
        </Button>
      </PageHeader>

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search clients..."
        filters={STATUS_FILTERS}
        selectedFilter={selectedStatus}
        onFilterChange={setSelectedStatus}
      />

      {/* Clients List */}
      <Card padding="p-0" className="overflow-hidden">
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
                                 <StatusBadge variant={client.status === 'Active' ? 'success' : 'default'}>
                                     {client.status}
                                 </StatusBadge>
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
      </Card>
    </div>
  );
};

export default Clients;

