import { useState } from 'react';
import { useSelector } from 'react-redux';
import { QRCodeSVG } from 'qrcode.react';
import { Clock, Zap, Calendar, CalendarDays } from 'lucide-react';
import { selectCurrentClientId } from '../store/slices/clientsSlice';
import { PageHeader, Modal, IconBox, StatusBadge } from '../components/common';

const services = [
  { id: 'per-minute', name: 'Per Minute', price: '₹1.20', unit: '/min', description: 'Pay as you go', icon: Clock, color: 'blue' },
  { id: 'hourly', name: 'Hourly', price: '₹75', unit: '/hour', description: 'Best for short sessions', icon: Zap, color: 'green' },
  { id: 'daily', name: 'Daily Pass', price: '₹199', unit: '/day', description: 'Unlimited access', icon: Calendar, color: 'purple' },
  { id: 'weekly', name: 'Weekly', price: '₹499', unit: '/week', description: 'Save 30%', icon: CalendarDays, color: 'orange' },
];

const colorMap = {
  blue: { bg: 'bg-blue-50', border: 'border-blue-200 hover:border-blue-400', iconBg: 'bg-blue-100', text: 'text-blue-600', badge: 'bg-blue-100 text-blue-700' },
  green: { bg: 'bg-emerald-50', border: 'border-emerald-200 hover:border-emerald-400', iconBg: 'bg-emerald-100', text: 'text-emerald-600', badge: 'bg-emerald-100 text-emerald-700' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200 hover:border-purple-400', iconBg: 'bg-purple-100', text: 'text-purple-600', badge: 'bg-purple-100 text-purple-700' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-200 hover:border-orange-400', iconBg: 'bg-orange-100', text: 'text-orange-600', badge: 'bg-orange-100 text-orange-700' },
};

const ScanEntry = () => {
  const storeId = useSelector(selectCurrentClientId);
  const [selectedService, setSelectedService] = useState(null);

  const getQRData = (service) => JSON.stringify({
    storeId,
    serviceId: service.id,
    serviceName: service.name,
    price: service.price,
    unit: service.unit,
  });

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <PageHeader 
        title="Select a Plan" 
        subtitle="Choose a plan to generate QR code for customers"
        className="text-center justify-center"
      />

      <div className="grid grid-cols-2 gap-4">
        {services.map((service) => {
          const colors = colorMap[service.color];
          const Icon = service.icon;
          return (
            <button
              key={service.id}
              onClick={() => setSelectedService(service)}
              className={`p-5 rounded-2xl border-2 text-left transition-all hover:shadow-md ${colors.bg} ${colors.border} ${colors.text}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${colors.iconBg}`}>
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

      <Modal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        title={selectedService?.name || ''}
        maxWidth="max-w-sm"
      >
        {selectedService && (
          <div className="p-6 text-center space-y-4">
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
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${colorMap[selectedService.color].badge}`}>
              <selectedService.icon className="w-4 h-4" />
              {selectedService.price}{selectedService.unit}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ScanEntry;