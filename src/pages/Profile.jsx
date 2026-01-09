import { useSelector, useDispatch } from 'react-redux';
import { User, Mail, Phone, Camera, Calendar, ShieldCheck, Activity, Edit2, MapPin, Store } from 'lucide-react';
import { useUpdateStoreMutation } from '../store/api/storeAccountApi';
import { updateStoreProfile } from '../store/slices/authSlice';
import EditableField from '../components/profile/EditableField';
import StatCard from '../components/profile/StatCard';

const Profile = () => {
  const { store } = useSelector((state) => state.auth);
  const [updateStore, { isLoading }] = useUpdateStoreMutation();
  const dispatch = useDispatch();

  const handleUpdate = async (field, value) => {
    try {
      if (!store?._id && !store?.id) return;
      
      const storeId = store._id || store.id;
      const result = await updateStore({ 
        id: storeId, 
        [field]: value 
      }).unwrap();
      
      // Update the Redux store with the updated data
      dispatch(updateStoreProfile(result));
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  if (!store) {
    return (
      <div className="flex items-center justify-center h-full p-12">
         <div className="flex flex-col items-center gap-4">
             <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
             <p className="text-gray-500 font-medium">Loading store profile...</p>
         </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Hero Header Section */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/30"></div>
        <div className="absolute top-0 right-0 p-12 opacity-50">
           <div className="absolute w-64 h-64 bg-blue-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        </div>
        
        <div className="relative px-8 py-10 flex flex-col md:flex-row items-center gap-8">
          {/* Avatar Section */}
          <div className="relative group">
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-50 flex items-center justify-center text-4xl font-bold text-gray-400 group-hover:scale-105 transition-transform duration-300">
              {store.avatar ? (
                <img src={store.avatar} alt={store.storeName} className="w-full h-full object-cover" />
              ) : (
                <span className="text-blue-600 font-bold">{store.storeName?.charAt(0).toUpperCase() || 'S'}</span>
              )}
            </div>
            <button className="absolute bottom-1 right-1 p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg border border-white transition-all transform hover:-translate-y-0.5">
              <Camera className="w-4 h-4" />
            </button>
          </div>

          {/* Store Info */}
          <div className="text-center md:text-left flex-1 space-y-2">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
               {store.storeName || 'Store Name'}
            </h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                 {store.storeType || 'STORE'}
               </span>
               <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                 store.verificationStatus === 'VERIFIED' ? 'bg-green-50 text-green-700 border border-green-100' :
                 store.verificationStatus === 'REJECTED' ? 'bg-red-50 text-red-700 border border-red-100' :
                 'bg-yellow-50 text-yellow-700 border border-yellow-100'
               }`}>
                 {store.verificationStatus || 'PENDING'}
               </span>
               <div className="flex items-center gap-1.5 text-sm text-gray-500 font-medium bg-white/60 px-2 py-0.5 rounded-md border border-gray-100/50">
                  <Mail className="w-3.5 h-3.5 text-gray-400" />
                  {store.email}
               </div>
            </div>
          </div>
          
          <div className="flex gap-3">
              <button className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
                  View Services
              </button>
              <button className="px-5 py-2.5 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200">
                  Settings
              </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info Column */}
        <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Store Information</h2>
                        <p className="text-sm text-gray-500">Manage your store details</p>
                    </div>
                </div>
                
                <div className="space-y-4">
                    <EditableField
                        label="Store Name"
                        field="storeName"
                        value={store.storeName}
                        onSave={handleUpdate}
                        isUpdating={isLoading}
                        icon={Store}
                    />
                    <EditableField
                        label="Owner Name"
                        field="ownerName"
                        value={store.ownerName}
                        onSave={handleUpdate}
                        isUpdating={isLoading}
                        icon={User}
                    />
                    <EditableField
                        label="Email Address"
                        field="email"
                        value={store.email}
                        onSave={handleUpdate}
                        isUpdating={isLoading}
                        icon={Mail}
                    />
                    <EditableField
                        label="Phone Number"
                        field="phone"
                        value={store.phone}
                        onSave={handleUpdate}
                        isUpdating={isLoading}
                        icon={Phone}
                    />
                    <EditableField
                         label="Location"
                         field="location.address"
                         value={store.location?.address || 'Not set'}
                         onSave={handleUpdate}
                         isUpdating={isLoading}
                         icon={MapPin}
                    />
                </div>
            </div>
        </div>

        {/* Side Column: Stats */}
        <div className="space-y-6">
            <div className="grid gap-4">
                 <StatCard 
                    label="Registered"
                    value={store.createdAt ? new Date(store.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
                    subtext="Store created"
                    icon={Calendar}
                 />
                 
                 <StatCard 
                    label="Store Status"
                    value={store.isActive ? 'Active' : 'Inactive'}
                    trend={store.isActive ? 'active' : 'inactive'}
                    icon={ShieldCheck}
                 />

                 <StatCard 
                    label="Verification"
                    value={store.verificationStatus || 'PENDING'}
                    subtext="Current status"
                    icon={Activity}
                 />
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg p-6 text-white text-center">
                 <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                     <ShieldCheck className="w-6 h-6 text-green-400" />
                 </div>
                 <h3 className="font-bold text-lg mb-2">Account Security</h3>
                 <p className="text-gray-400 text-sm mb-6">Two-factor authentication is currently enabled for your account.</p>
                 <button className="w-full py-2.5 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-50 transition-colors">
                     Manage Security
                 </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
