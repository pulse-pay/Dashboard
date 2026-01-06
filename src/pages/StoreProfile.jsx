import { useState } from 'react';
import { Edit, Save, X, Building2, MapPin, Phone, FileText } from 'lucide-react';
import Button from '../components/common/Button';

const StoreProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    storeName: 'FitZone Gym',
    address: '123 Fitness Street, Downtown District',
    location: 'New York, NY 10001',
    contactNumber: '+1 (555) 123-4567',
    gstNumber: 'GST-123456789',
  });

  const [originalData, setOriginalData] = useState({ ...formData });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setOriginalData({ ...formData });
    setIsEditing(false);
    // Here you would typically save to backend
    console.log('Saving store profile:', formData);
  };

  const handleCancel = () => {
    setFormData({ ...originalData });
    setIsEditing(false);
  };

  const formFields = [
    {
      id: 'storeName',
      label: 'Store Name',
      icon: Building2,
      placeholder: 'Enter store name',
    },
    {
      id: 'address',
      label: 'Address',
      icon: MapPin,
      placeholder: 'Enter street address',
    },
    {
      id: 'location',
      label: 'Location',
      icon: MapPin,
      placeholder: 'Enter city, state, zip',
    },
    {
      id: 'contactNumber',
      label: 'Contact Number',
      icon: Phone,
      placeholder: 'Enter contact number',
    },
    {
      id: 'gstNumber',
      label: 'GST/Tax ID',
      icon: FileText,
      placeholder: 'Enter GST or Tax ID',
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text">Store Profile</h1>
          <p className="text-text-secondary mt-2">Manage your store information and settings</p>
        </div>
        {!isEditing ? (
          <Button
            variant="primary"
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Edit
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              onClick={handleCancel}
              className="flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <div className="max-w-3xl">
        <div className="bg-surface rounded-lg shadow-sm p-6 border border-border">
          <div className="space-y-6">
            {formFields.map((field) => {
              const Icon = field.icon;
              return (
                <div key={field.id}>
                  <label className="flex items-center gap-2 text-sm font-medium text-text mb-2">
                    <Icon className="w-4 h-4 text-primary" />
                    {field.label}
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData[field.id]}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-background rounded-lg text-text border border-border">
                      {formData[field.id] || <span className="text-text-secondary">Not set</span>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!isEditing && (
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm text-text-secondary">
                Click the "Edit" button above to modify your store information.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreProfile;
