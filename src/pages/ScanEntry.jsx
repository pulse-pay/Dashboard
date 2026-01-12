import { useState } from 'react';
import { useSelector } from 'react-redux';
import { QRCodeSVG } from 'qrcode.react';
import { Clock, Zap, Calendar, CalendarDays, X } from 'lucide-react';
import { selectCurrentClientId } from '../store/slices/clientsSlice';

const services = [
  {
    id: 'per-minute',
    name: 'Per Minute',
    price: '₹1.20',
    unit: '/min',
    description: 'Pay as you go',
    icon: Clock,
    color: 'blue',
  },
  {
    id: 'hourly',
    name: 'Hourly',
    price: '₹75',
    unit: '/hour',
    description: 'Best for short sessions',
    icon: Zap,
    color: 'emerald',
  },
  {
    id: 'daily',
    name: 'Daily Pass',
    price: '₹199',
    unit: '/day',
    description: 'Unlimited access',
    icon: Calendar,
    color: 'purple',
  },
  {
    id: 'weekly',
    name: 'Weekly',
    price: '₹499',
    unit: '/week',
    description: 'Save 30%',
    icon: CalendarDays,
    color: 'orange',
  },
];

const ScanEntry = () => {
  const storeId = useSelector(selectCurrentClientId);
  const [selectedService, setSelectedService] = useState(null);

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  const handleClose = () => {
    setSelectedService(null);
  };

  // Generate QR data with service and store info
  const getQRData = (service) => {
    return JSON.stringify({
      storeId,
      serviceId: service.id,
      serviceName: service.name,
      price: service.price,
      unit: service.unit,
    });
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600 border-blue-200 hover:border-blue-400',
      emerald: 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:border-emerald-400',
      purple: 'bg-purple-50 text-purple-600 border-purple-200 hover:border-purple-400',
      orange: 'bg-orange-50 text-orange-600 border-orange-200 hover:border-orange-400',
    };
    return colors[color];
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Select a Plan</h1>
        <p className="text-gray-500 text-sm">Choose a plan to generate QR code for customers</p>
      </div>

      {/* Service Cards Grid */}
      <div className="grid grid-cols-2 gap-4">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <button
              key={service.id}
              onClick={() => handleServiceClick(service)}
              className={`p-5 rounded-2xl border-2 text-left transition-all hover:shadow-md ${getColorClasses(service.color)}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                service.color === 'blue' ? 'bg-blue-100' :
                service.color === 'emerald' ? 'bg-emerald-100' :
                service.color === 'purple' ? 'bg-purple-100' : 'bg-orange-100'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="font-semibold text-gray-900">{service.name}</p>
              <div className="mt-1">
                <span className="text-xl font-bold text-gray-900">{service.price}</span>
                <span className="text-gray-500 text-sm">{service.unit}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{service.description}</p>
            </button>
          );
        })}
      </div>

      {/* QR Code Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div>
                <h2 className="font-semibold text-gray-900">{selectedService.name}</h2>
                <p className="text-sm text-gray-500">{selectedService.price}{selectedService.unit}</p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* QR Code Display */}
            <div className="p-6">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 bg-white rounded-2xl border-2 border-gray-100 shadow-sm">
                    <QRCodeSVG
                      value={getQRData(selectedService)}
                      size={200}
                      level="H"
                      includeMargin={false}
                      bgColor="#ffffff"
                      fgColor="#111827"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-900 font-medium">Scan to Subscribe</p>
                  <p className="text-gray-500 text-sm">Customer scans this QR to start {selectedService.name} plan</p>
                </div>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                  selectedService.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                  selectedService.color === 'emerald' ? 'bg-emerald-100 text-emerald-700' :
                  selectedService.color === 'purple' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'
                }`}>
                  <selectedService.icon className="w-4 h-4" />
                  {selectedService.price}{selectedService.unit}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScanEntry;