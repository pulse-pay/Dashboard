import Card from '../common/Card';
import InfoItem from './InfoItem';
import { Mail, Phone, Settings } from 'lucide-react';

const ProfileCard = ({ user }) => {
  const infoItems = [
    { icon: Mail, label: 'Email', value: user.email },
    { icon: Phone, label: 'Phone', value: user.phone },
    { icon: Settings, label: 'Settings', value: 'Manage preferences' },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center gap-6 mb-6">
        <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
          {user.avatar || user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <div className="space-y-4">
        {infoItems.map((item, index) => (
          <InfoItem key={index} icon={item.icon} label={item.label} value={item.value} />
        ))}
      </div>
    </Card>
  );
};

export default ProfileCard;

