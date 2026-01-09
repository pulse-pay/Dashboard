import { useState } from 'react';
import { Edit2, Save, X } from 'lucide-react';

const EditableField = ({ label, value, field, onSave, isUpdating, icon: Icon }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleSave = async () => {
    if (tempValue !== value) {
      await onSave(field, tempValue);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempValue(value);
    setIsEditing(false);
  };

  return (
    <div className="group relative overflow-hidden rounded-xl bg-white border border-gray-100 p-4 transition-all duration-200 hover:shadow-md hover:border-blue-100">
      <div className="relative flex items-center gap-4">
        {Icon && (
          <div className="flex-shrink-0 p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 transition-colors">
            <Icon className="w-5 h-5" />
          </div>
        )}
        
        <div className="flex-grow min-w-0">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">{label}</p>
          {isEditing ? (
            <input
              type="text"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="w-full bg-gray-50 border border-blue-500 rounded px-2 py-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium text-base"
              autoFocus
            />
          ) : (
            <p className="text-base font-semibold text-gray-900 truncate">{value || 'Not set'}</p>
          )}
        </div>

        <div className="flex-shrink-0 flex gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-all duration-200">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                disabled={isUpdating}
                className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm"
              >
                <Save className="w-4 h-4" />
              </button>
              <button
                onClick={handleCancel}
                className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 bg-gray-50 hover:bg-white text-gray-400 hover:text-blue-600 rounded-lg transition-all border border-transparent hover:border-gray-200 hover:shadow-sm"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditableField;
