import { useState } from 'react';
import { 
  Building2, MapPin, Phone, FileText, 
  Store, Globe, Shield, ArrowUpRight, 
  Save, Camera, Trash2 
} from 'lucide-react';

const StoreProfile = () => {
  const [formData, setFormData] = useState({
    storeName: 'PulsePay Flagship Store',
    description: 'Premier electronics and digital services provider.',
    address: '123 Tech Plaza, Innovation District',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105',
    contactNumber: '+1 (555) 123-4567',
    email: 'contact@pulsepay-store.com',
    gstNumber: 'GST-987654321',
    website: 'www.pulsepay-store.com',
    currency: 'USD',
    taxRate: '8.5%'
  });

  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setIsDirty(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Store Settings</h1>
          <p className="text-gray-500 mt-1">Manage your business profile and configuration</p>
        </div>
        <button 
            disabled={!isDirty}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-all shadow-sm ${
                isDirty 
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
        >
            <Save className="w-4 h-4" />
            Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Store Identity */}
          <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4 group">
                      <div className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg shadow-blue-200">
                          <Store className="w-12 h-12" />
                      </div>
                      <button className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Camera className="w-8 h-8 text-white" />
                      </button>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{formData.storeName}</h2>
                  <p className="text-sm text-gray-500 mt-1">Store ID: #STORE-8832</p>
                  
                  <div className="mt-6 flex justify-center gap-3">
                      <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">
                          <Globe className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">
                          <Shield className="w-5 h-5" />
                      </button>
                  </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl shadow-lg text-white">
                  <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-white/10 rounded-lg">
                          <ArrowUpRight className="w-5 h-5 text-green-400" />
                      </div>
                      <h3 className="font-semibold">Subscription Plan</h3>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">You are currently on the <span className="font-bold text-white">Enterprise Plan</span>.</p>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-2">
                      <div className="w-3/4 h-full bg-blue-500"></div>
                  </div>
                  <p className="text-xs text-gray-400">Next billing date: Aug 01, 2024</p>
                  <button className="mt-6 w-full py-2 bg-white text-gray-900 font-semibold rounded-lg text-sm hover:bg-gray-50 transition-colors">
                      Manage Subscription
                  </button>
              </div>
          </div>

          {/* Right Column: Form Fields */}
          <div className="lg:col-span-2 space-y-6">
              {/* General Information */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-blue-600" />
                      General Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
                          <input 
                              type="text" 
                              name="storeName"
                              value={formData.storeName}
                              onChange={handleChange}
                              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                          />
                      </div>
                      <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <textarea 
                              name="description"
                              rows="3"
                              value={formData.description}
                              onChange={handleChange}
                              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none"
                          />
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                          <div className="relative">
                              <Globe className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                              <input 
                                  type="text" 
                                  name="website"
                                  value={formData.website}
                                  onChange={handleChange}
                                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                              />
                          </div>
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
                          <input 
                              type="email" 
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                          />
                      </div>
                  </div>
              </div>

              {/* Location & Contact */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                       <MapPin className="w-5 h-5 text-red-500" />
                       Location & Contact
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                          <input 
                              type="text" 
                              name="address"
                              value={formData.address}
                              onChange={handleChange}
                              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                          />
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                          <input 
                              type="text" 
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                          />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                              <input 
                                  type="text" 
                                  name="state"
                                  value={formData.state}
                                  onChange={handleChange}
                                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                              />
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Zip</label>
                              <input 
                                  type="text" 
                                  name="zip"
                                  value={formData.zip}
                                  onChange={handleChange}
                                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                              />
                          </div>
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                          <div className="relative">
                               <Phone className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                               <input 
                                  type="text" 
                                  name="contactNumber"
                                  value={formData.contactNumber}
                                  onChange={handleChange}
                                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                               />
                          </div>
                      </div>
                  </div>
              </div>

               {/* Tax & Financial */}
               <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                       <FileText className="w-5 h-5 text-purple-600" />
                       Financial Details
                  </h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">GST / Tax ID</label>
                          <input 
                              type="text" 
                              name="gstNumber"
                              value={formData.gstNumber}
                              onChange={handleChange}
                              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                          />
                       </div>
                       <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Default Global Tax Rate</label>
                          <input 
                              type="text" 
                              name="taxRate"
                              value={formData.taxRate}
                              onChange={handleChange}
                              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                          />
                       </div>
                   </div>
               </div>
               
               {/* Danger Zone */}
               <div className="bg-red-50 p-6 sm:p-8 rounded-2xl border border-red-100">
                   <h3 className="text-lg font-bold text-red-700 mb-4">Danger Zone</h3>
                   <div className="flex items-center justify-between">
                       <div>
                           <p className="font-semibold text-gray-900">Delete Store Profile</p>
                           <p className="text-sm text-gray-500 mt-1">Permanently delete your store and all associated data.</p>
                       </div>
                       <button className="px-5 py-2.5 bg-white text-red-600 border border-red-200 rounded-xl font-medium hover:bg-red-50 transition-colors shadow-sm">
                           Delete Store
                       </button>
                   </div>
               </div>
          </div>
      </div>
    </div>
  );
};

export default StoreProfile;
