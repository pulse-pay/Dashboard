import { User, Mail, Phone, Settings } from 'lucide-react';

const Profile = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600 mt-1">Manage your account settings</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            U
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">User Name</h2>
            <p className="text-gray-600">user@example.com</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <Mail className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-gray-900">user@example.com</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <Phone className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="text-gray-900">+1 (555) 123-4567</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <Settings className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Settings</p>
              <p className="text-gray-900">Manage preferences</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

