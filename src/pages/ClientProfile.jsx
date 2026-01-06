import { useParams } from 'react-router-dom';
import { Mail, Phone, Building, MapPin, Calendar } from 'lucide-react';
import { useState } from 'react';
import ClientHeader from '../components/clientProfile/ClientHeader';
import TabNavigation from '../components/common/TabNavigation';
import ContactInfoCard from '../components/clientProfile/ContactInfoCard';
import TransactionsList from '../components/clientProfile/TransactionsList';
import DocumentsCard from '../components/clientProfile/DocumentsCard';
import QuickActionsSidebar from '../components/clientProfile/QuickActionsSidebar';
import Card from '../components/common/Card';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ClientProfile = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedDetails, setExpandedDetails] = useState(true);

  const client = {
    id: id,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Acme Corp',
    location: 'San Francisco, CA',
    joinDate: 'January 15, 2023',
    status: 'Active',
    avatar: 'JD',
  };

  const transactions = [
    { id: 1, date: '2024-01-15', amount: '$1,250.00', description: 'Monthly Subscription', status: 'Completed' },
    { id: 2, date: '2024-01-10', amount: '$500.00', description: 'Service Fee', status: 'Completed' },
    { id: 3, date: '2024-01-05', amount: '$2,000.00', description: 'Project Payment', status: 'Pending' },
    { id: 4, date: '2024-01-01', amount: '$750.00', description: 'Renewal Fee', status: 'Completed' },
    { id: 5, date: '2023-12-28', amount: '$450.00', description: 'Service Fee', status: 'Completed' },
  ];

  const tabs = ['overview', 'transactions', 'documents'];

  const contactInfoItems = [
    { id: 'email', icon: Mail, label: client.email },
    { id: 'phone', icon: Phone, label: client.phone },
    { id: 'company', icon: Building, label: client.company },
    { id: 'location', icon: MapPin, label: client.location },
    { id: 'joinDate', icon: Calendar, label: `Joined ${client.joinDate}` },
  ];

  const quickActions = [
    { id: 'send-message', label: 'Send Message', variant: 'primary' },
    { id: 'schedule-meeting', label: 'Schedule Meeting', variant: 'secondary' },
    { id: 'add-note', label: 'Add Note', variant: 'secondary' },
  ];

  const recentActivities = [
    { id: 1, title: 'Payment received', time: '2 days ago' },
    { id: 2, title: 'Contract updated', time: '1 week ago' },
    { id: 3, title: 'Meeting scheduled', time: '2 weeks ago' },
  ];

  const handleActionClick = (actionId, actionLabel) => {
    console.log(`Action clicked: ${actionLabel} (${actionId})`);
  };

  return (
    <div className="flex h-full">
      {/* Left Side - Client Details and Transactions */}
      <div className="flex-1 p-6 overflow-y-auto">
        <BackButton />
        
        {/* Client Details Card */}
        <Card className="mb-6 overflow-hidden">
          {/* Card Header - Always Visible */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-text">{client.name}</h1>
              <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
                client.status === 'Active' 
                  ? 'bg-green-100 text-success' 
                  : 'bg-gray-100 text-text-secondary'
              }`}>
                {client.status}
              </span>
            </div>
            
            {/* Hidden Details Preview */}
            <div className="space-y-2 text-sm">
              <p className="text-text-secondary">
                <span className="text-text font-medium">Email:</span> <span className="blur-sm select-none">•••••••••••••••</span>
              </p>
              <p className="text-text-secondary">
                <span className="text-text font-medium">Phone:</span> <span className="blur-sm select-none">•••••••••••</span>
              </p>
              <p className="text-text-secondary">
                <span className="text-text font-medium">Location:</span> <span className="blur-sm select-none">•••••••••••</span>
              </p>
            </div>
          </div>

          {/* Expand/Collapse Button */}
          <button
            onClick={() => setExpandedDetails(!expandedDetails)}
            className="w-full bg-background border-t border-border p-4 hover:bg-border transition-colors flex items-center justify-between"
          >
            <span className="text-sm font-medium text-text-secondary">
              {expandedDetails ? 'Hide Details' : 'Show Details'}
            </span>
            {expandedDetails ? (
              <ChevronUp className="w-4 h-4 text-text-secondary" />
            ) : (
              <ChevronDown className="w-4 h-4 text-text-secondary" />
            )}
          </button>

          {/* Expanded Details */}
          {expandedDetails && (
            <div className="bg-background p-6 border-t border-border">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-text-secondary uppercase tracking-wide font-medium">Email</p>
                  <p className="text-sm text-text mt-2">{client.email}</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary uppercase tracking-wide font-medium">Phone</p>
                  <p className="text-sm text-text mt-2">{client.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary uppercase tracking-wide font-medium">Company</p>
                  <p className="text-sm text-text mt-2">{client.company}</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary uppercase tracking-wide font-medium">Location</p>
                  <p className="text-sm text-text mt-2">{client.location}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-text-secondary uppercase tracking-wide font-medium">Join Date</p>
                  <p className="text-sm text-text mt-2">{client.joinDate}</p>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Transactions Section */}
        <div>
          <h2 className="text-lg font-bold text-text mb-4">Transaction History</h2>
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-background">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-background transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-text">{transaction.date}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-text">{transaction.description}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-success">{transaction.amount}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          transaction.status === 'Completed'
                            ? 'bg-green-100 text-success'
                            : 'bg-yellow-100 text-warning'
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      {/* Right Side - Quick Actions Sidebar */}
      <QuickActionsSidebar
        quickActions={quickActions}
        recentActivities={recentActivities}
        onActionClick={handleActionClick}
      />
    </div>
  );
};

// Simple Back Button Component
function BackButton() {
  const navigate = require('react-router-dom').useNavigate();
  return (
    <button
      onClick={() => navigate('/clients')}
      className="flex items-center gap-2 text-text-secondary hover:text-primary mb-6 transition-colors font-medium text-sm"
    >
      <span>← Back to Clients</span>
    </button>
  );
}

export default ClientProfile;
