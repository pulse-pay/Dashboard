import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useState } from 'react';

/**
 * Clients Page
 * 
 * Displays clients as expandable cards.
 * Clicking on a client card navigates to their detailed profile.
 */
const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [revealedDetails, setRevealedDetails] = useState({});

  // Mock data - in real app, this would come from an API
  const clientsData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 (555) 123-4567', status: 'Active', joinDate: 'Jan 15, 2024' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1 (555) 234-5678', status: 'Active', joinDate: 'Jan 10, 2024' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '+1 (555) 345-6789', status: 'Inactive', joinDate: 'Dec 20, 2023' },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', phone: '+1 (555) 456-7890', status: 'Active', joinDate: 'Jan 5, 2024' },
    { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', phone: '+1 (555) 567-8901', status: 'Active', joinDate: 'Dec 28, 2023' },
    { id: 6, name: 'Diana Prince', email: 'diana@example.com', phone: '+1 (555) 678-9012', status: 'Inactive', joinDate: 'Dec 15, 2023' },
  ];

  // Filter clients based on search term
  const filteredClients = clientsData.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleReveal = (id) => {
    setRevealedDetails(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="p-6">
      <div>
        <h1 className="text-3xl font-bold text-text">Clients</h1>
        <p className="text-text-secondary mt-2">Click on a client card to view their profile</p>
      </div>

      {/* Search Bar */}
      <div className="mb-8 mt-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
          <input
            type="text"
            placeholder="Search clients by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text placeholder-text-secondary"
          />
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <div key={client.id} className="bg-surface rounded-lg shadow-sm border border-border hover:shadow-md transition-all duration-200 overflow-hidden">
            {/* Main Card Content */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-text">{client.name}</h3>
                <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
                  client.status === 'Active' 
                    ? 'bg-green-100 text-success' 
                    : 'bg-gray-100 text-text-secondary'
                }`}>
                  {client.status}
                </span>
              </div>
              
              {/* Hidden Details - Blurred by default */}
              <div className="space-y-2 text-sm mb-6">
                <p className="text-text-secondary">
                  <span className="text-text font-medium">Email:</span> 
                  <span className={revealedDetails[client.id] ? 'text-text ml-2' : 'blur-sm select-none ml-2'}>
                    {revealedDetails[client.id] ? client.email : '•••••••••••••••'}
                  </span>
                </p>
                <p className="text-text-secondary">
                  <span className="text-text font-medium">Phone:</span> 
                  <span className={revealedDetails[client.id] ? 'text-text ml-2' : 'blur-sm select-none ml-2'}>
                    {revealedDetails[client.id] ? client.phone : '•••••••••••'}
                  </span>
                </p>
                <p className="text-text-secondary">
                  <span className="text-text font-medium">Join Date:</span> 
                  <span className={revealedDetails[client.id] ? 'text-text ml-2' : 'blur-sm select-none ml-2'}>
                    {revealedDetails[client.id] ? client.joinDate : '•••••••••••'}
                  </span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-4 border-t border-border">
                <Link
                  to={`/clients/${client.id}`}
                  className="flex-1 text-xs text-primary font-medium py-2 px-3 rounded hover:text-primary/70 transition-colors text-center"
                >
                  View Full Profile →
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleReveal(client.id);
                  }}
                  className="w-32 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium text-sm whitespace-nowrap shadow-sm"
                >
                  {revealedDetails[client.id] ? 'Hide Details' : 'Show Details'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-secondary text-sm">
            {searchTerm ? 'No clients found matching your search.' : 'No clients yet.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Clients;

