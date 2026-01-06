import BackButton from '../common/BackButton';
import Avatar from '../common/Avatar';
import StatusBadge from '../common/StatusBadge';

const ClientHeader = ({ client, backTo = '/clients', backLabel = 'Back to Clients' }) => {
  return (
    <div className="mb-6">
      <BackButton to={backTo} label={backLabel} />
      
      <div className="flex items-center gap-4">
        <Avatar name={client.name} avatar={client.avatar} size="lg" />
        <div>
          <h1 className="text-2xl font-bold text-text">{client.name}</h1>
          <p className="text-text-secondary">{client.email}</p>
        </div>
        <div className="ml-auto">
          <StatusBadge status={client.status} />
        </div>
      </div>
    </div>
  );
};

export default ClientHeader;

