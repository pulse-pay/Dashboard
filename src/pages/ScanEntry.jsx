import { useState } from 'react';
import { useSelector } from 'react-redux';
import { QRCodeSVG } from 'qrcode.react';
import { Package, Clock, Wallet, QrCode, Download, Copy, Check } from 'lucide-react';
import { useGetServicesQuery } from '../store/api/serviceApi';
import { PageHeader, Modal, Card, StatusBadge, LoadingSpinner, EmptyState, Button } from '../components/common';

// Currency formatter
const formatCurrency = (amount) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(amount);

const ScanEntry = () => {
    const { store } = useSelector((state) => state.auth);
    const storeId = store?.id || store?._id;
    
    const [selectedService, setSelectedService] = useState(null);
    const [copied, setCopied] = useState(false);
    
    // Fetch services from API
    const { data: services = [], isLoading, isError } = useGetServicesQuery(
        { storeId }, 
        { skip: !storeId }
    );

    // Filter only active services
    const activeServices = services.filter(service => service.isActive);

    // Generate QR data from qrCodeId
    const getQRData = (service) => JSON.stringify({
        qrCodeId: service.qrCodeId,
        serviceId: service._id,
        storeId: service.storeId?._id || service.storeId,
        name: service.name,
        ratePerSecond: service.ratePerSecond,
        minBalanceRequired: service.minBalanceRequired,
    });

    const handleCopyQrCode = (qrCodeId) => {
        navigator.clipboard.writeText(qrCodeId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownloadQR = (service) => {
        const svg = document.getElementById(`qr-${service._id}`);
        if (!svg) return;
        
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            
            const link = document.createElement('a');
            link.download = `${service.name.replace(/\s+/g, '-')}-QR.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        };
        
        img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    };

    if (isLoading) {
        return <LoadingSpinner fullScreen text="Loading services..." />;
    }

    if (isError) {
        return (
            <EmptyState
                icon={QrCode}
                title="Failed to load services"
                description="Unable to fetch your services. Please try again."
            />
        );
    }

    return (
        <div className="space-y-8">
            <PageHeader 
                title="Service QR Codes" 
                subtitle="Generate and display QR codes for customers to scan and start sessions"
            />

            {activeServices.length === 0 ? (
                <EmptyState
                    icon={Package}
                    title="No active services"
                    description="Create services in the Services page first, then come back here to generate QR codes for customers."
                    actionLabel="Go to Services"
                    onAction={() => window.location.href = '/services'}
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeServices.map((service) => (
                        <Card key={service._id} hover className="text-center">
                            {/* Service Header */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <Package className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-bold text-gray-900 truncate max-w-[150px]">{service.name}</h3>
                                        <p className="text-xs text-gray-500">{formatCurrency(service.ratePerSecond ?? service.ratePerMinute / 60)}/sec</p>
                                    </div>
                                </div>
                                <StatusBadge variant="success" size="xs">Active</StatusBadge>
                            </div>

                            {/* QR Code Preview */}
                            <div 
                                className="p-4 bg-gray-50 rounded-xl mb-4 cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={() => setSelectedService(service)}
                            >
                                <QRCodeSVG
                                    id={`qr-preview-${service._id}`}
                                    value={getQRData(service)}
                                    size={120}
                                    level="H"
                                    includeMargin={false}
                                    bgColor="transparent"
                                    fgColor="#111827"
                                    className="mx-auto"
                                />
                                <p className="text-xs text-gray-500 mt-2">Click to enlarge</p>
                            </div>

                            {/* QR Code ID */}
                            <div className="flex items-center justify-center gap-2 px-3 py-2 bg-orange-50 rounded-lg mb-4">
                                <QrCode className="w-4 h-4 text-orange-500" />
                                <code className="text-xs font-mono text-orange-700">{service.qrCodeId}</code>
                            </div>

                            {/* Actions */}
                            <Button 
                                variant="primary" 
                                size="sm" 
                                className="w-full"
                                onClick={() => setSelectedService(service)}
                            >
                                <QrCode className="w-4 h-4" />
                                View Full QR
                            </Button>
                        </Card>
                    ))}
                </div>
            )}

            {/* QR Code Modal */}
            <Modal
                isOpen={!!selectedService}
                onClose={() => setSelectedService(null)}
                title={selectedService?.name || 'Service QR Code'}
                maxWidth="max-w-md"
            >
                {selectedService && (
                    <div className="p-6 space-y-6">
                        {/* Large QR Code */}
                        <div className="flex justify-center">
                            <div className="p-6 bg-white rounded-2xl border-2 border-gray-100 shadow-sm">
                                <QRCodeSVG
                                    id={`qr-${selectedService._id}`}
                                    value={getQRData(selectedService)}
                                    size={220}
                                    level="H"
                                    includeMargin={false}
                                    bgColor="#ffffff"
                                    fgColor="#111827"
                                />
                            </div>
                        </div>

                        {/* Service Details */}
                        <div className="text-center space-y-2">
                            <h3 className="text-lg font-bold text-gray-900">{selectedService.name}</h3>
                            <p className="text-gray-500 text-sm">Customer scans this QR to start a session</p>
                        </div>

                        {/* Pricing Info */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-blue-50 rounded-xl text-center">
                                <Clock className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                                <p className="text-xs text-gray-500">Rate / second</p>
                                <p className="font-bold text-gray-900">{formatCurrency(selectedService.ratePerSecond ?? selectedService.ratePerMinute / 60)}</p>
                            </div>
                            <div className="p-3 bg-purple-50 rounded-xl text-center">
                                <Wallet className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                                <p className="text-xs text-gray-500">Min Balance</p>
                                <p className="font-bold text-gray-900">{formatCurrency(selectedService.minBalanceRequired)}</p>
                            </div>
                        </div>

                        {/* QR Code ID with copy */}
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-2">
                                <QrCode className="w-4 h-4 text-gray-500" />
                                <code className="text-sm font-mono text-gray-700">{selectedService.qrCodeId}</code>
                            </div>
                            <button
                                onClick={() => handleCopyQrCode(selectedService.qrCodeId)}
                                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-500" />}
                            </button>
                        </div>

                        {/* Download Button */}
                        <Button 
                            variant="primary" 
                            className="w-full"
                            onClick={() => handleDownloadQR(selectedService)}
                        >
                            <Download className="w-4 h-4" />
                            Download QR Code
                        </Button>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ScanEntry;