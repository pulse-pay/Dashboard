import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Plus, Package, Edit2, Trash2, ToggleLeft, ToggleRight, Clock, Wallet, QrCode, ChevronDown } from 'lucide-react';
import {
    useGetServicesQuery,
    useCreateServiceMutation,
    useUpdateServiceMutation,
    useDeleteServiceMutation,
    useToggleServiceStatusMutation,
} from '../store/api/serviceApi';
import { setFormData, resetFormData, openForm, closeForm } from '../store/slices/servicesSlice';
import { PageHeader, StatusBadge, LoadingSpinner, EmptyState, Modal, ConfirmBanner, Button, Card, IconBox } from '../components/common';

// Currency formatter
const formatCurrency = (amount) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(amount);

// Form fields configuration
const formFields = [
    { name: 'name', label: 'Service Name', type: 'text', placeholder: 'e.g., Premium Gym Session' },
    { name: 'ratePerMinute', label: 'Rate Per Minute (₹)', type: 'number', placeholder: 'e.g., 2.00', hint: 'Rate per second will be calculated automatically' },
    { name: 'minBalanceRequired', label: 'Minimum Balance Required (₹)', type: 'number', placeholder: 'e.g., 100', hint: 'Users need at least this balance to start a session' },
];

const Services = () => {
    const dispatch = useDispatch();
    const { store } = useSelector((state) => state.auth);
    const { formData, isFormOpen, editingServiceId } = useSelector((state) => state.services);
    const storeId = store?.id || store?._id;

    // RTK Query hooks
    const { data: services = [], isLoading: isLoadingServices } = useGetServicesQuery({ storeId }, { skip: !storeId });
    const [createService, { isLoading: isCreating }] = useCreateServiceMutation();
    const [updateService, { isLoading: isUpdating }] = useUpdateServiceMutation();
    const [deleteService, { isLoading: isDeleting }] = useDeleteServiceMutation();
    const [toggleServiceStatus] = useToggleServiceStatusMutation();

    // Local state
    const [formError, setFormError] = useState('');
    const [deleteState, setDeleteState] = useState({ isOpen: false, service: null, showConfirm: false });

    const isSubmitting = isCreating || isUpdating;

    // Handlers
    const handleInputChange = useCallback((e) => {
        dispatch(setFormData({ [e.target.name]: e.target.value }));
        setFormError('');
    }, [dispatch]);

    const handleOpenCreateForm = useCallback(() => {
        dispatch(resetFormData());
        dispatch(openForm());
    }, [dispatch]);

    const handleCloseForm = useCallback(() => {
        dispatch(closeForm());
        setFormError('');
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');

        const { name, ratePerMinute, minBalanceRequired } = formData;
        
        // Parse values first
        const rate = parseFloat(ratePerMinute);
        const minBalance = parseFloat(minBalanceRequired);
        
        // Validation with proper NaN checks
        if (!name?.trim()) return setFormError('Service name is required');
        if (!ratePerMinute || isNaN(rate) || rate <= 0) return setFormError('Rate per minute must be a valid positive number');
        if (!minBalanceRequired || isNaN(minBalance) || minBalance <= 0) return setFormError('Minimum balance must be a valid positive number');

        const serviceData = {
            storeId,
            name: name.trim(),
            ratePerMinute: rate,
            minBalanceRequired: minBalance,
        };

        try {
            if (editingServiceId) {
                await updateService({ id: editingServiceId, ...serviceData }).unwrap();
            } else {
                await createService(serviceData).unwrap();
            }
            handleCloseForm();
        } catch (error) {
            setFormError(error?.data?.message || 'Failed to save service');
        }
    };

    const handleDeleteSelect = (service) => setDeleteState({ isOpen: false, service, showConfirm: true });
    const handleDeleteCancel = () => setDeleteState({ isOpen: false, service: null, showConfirm: false });
    
    const handleDeleteConfirm = async () => {
        if (!deleteState.service) return;
        try {
            await deleteService(deleteState.service._id).unwrap();
            handleDeleteCancel();
        } catch (error) {
            console.error('Failed to delete service:', error);
        }
    };

    const handleToggleStatus = async (service) => {
        try {
            await toggleServiceStatus({ id: service._id, isActive: !service.isActive }).unwrap();
        } catch (error) {
            console.error('Failed to toggle service status:', error);
        }
    };

    const toggleDropdown = () => setDeleteState(prev => ({ 
        isOpen: !prev.isOpen, 
        service: null, 
        showConfirm: false 
    }));

    return (
        <div className="space-y-8">
            <PageHeader title="Service Packages" subtitle="Create and manage your store service offerings">
                <Button onClick={handleOpenCreateForm} variant="primary">
                    <Plus className="w-4 h-4" />
                    Add Service
                </Button>
                
                {services.length > 0 && (
                    <div className="relative">
                        <Button
                            onClick={toggleDropdown}
                            variant={deleteState.isOpen ? 'danger' : 'outline'}
                        >
                            <Trash2 className="w-4 h-4" />
                            Remove
                            <ChevronDown className={`w-4 h-4 transition-transform ${deleteState.isOpen ? 'rotate-180' : ''}`} />
                        </Button>
                        
                        {deleteState.isOpen && (
                            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 max-h-80 overflow-y-auto">
                                <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                                    Select service to remove
                                </p>
                                {services.map((service) => (
                                    <button
                                        key={service._id}
                                        onClick={() => handleDeleteSelect(service)}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-red-50 transition-colors group"
                                    >
                                        <IconBox icon={Package} variant={service.isActive ? 'blue' : 'gray'} size="sm" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate group-hover:text-red-600">{service.name}</p>
                                            <p className="text-xs text-gray-500">{formatCurrency(service.ratePerMinute)}/min</p>
                                        </div>
                                        <Trash2 className="w-4 h-4 text-gray-300 group-hover:text-red-500" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </PageHeader>

            {deleteState.showConfirm && deleteState.service && (
                <ConfirmBanner
                    icon={Trash2}
                    title={`Delete "${deleteState.service.name}"?`}
                    description="This action cannot be undone."
                    confirmLabel={isDeleting ? 'Deleting...' : 'Delete Service'}
                    onConfirm={handleDeleteConfirm}
                    onCancel={handleDeleteCancel}
                    isLoading={isDeleting}
                    variant="danger"
                />
            )}

            {isLoadingServices && <LoadingSpinner fullScreen />}

            {!isLoadingServices && services.length === 0 && (
                <EmptyState
                    icon={Package}
                    title="No services yet"
                    description="Create your first service package to start accepting streaming payments from clients."
                    actionLabel="Create Your First Service"
                    onAction={handleOpenCreateForm}
                />
            )}

            {/* Services Grid */}
            {!isLoadingServices && services.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <ServiceCard 
                            key={service._id} 
                            service={service} 
                            onEdit={() => dispatch(openForm(service))} 
                            onToggle={() => handleToggleStatus(service)} 
                        />
                    ))}
                </div>
            )}

            {isFormOpen && (
                <Modal isOpen={isFormOpen} onClose={handleCloseForm} title={editingServiceId ? 'Edit Service' : 'Create New Service'}>
                    <form onSubmit={handleSubmit} className="p-6 space-y-5">
                        {formError && <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">{formError}</div>}
                        {formFields.map((field) => (
                            <FormInput
                                key={field.name}
                                label={field.label}
                                name={field.name}
                                type={field.type}
                                value={formData[field.name]}
                                onChange={handleInputChange}
                                placeholder={field.placeholder}
                                hint={field.hint}
                            />
                        ))}
                        <div className="flex gap-3 pt-2">
                            <Button type="button" onClick={handleCloseForm} variant="secondary" className="flex-1 py-3">
                                Cancel
                            </Button>
                            <Button type="submit" variant="primary" loading={isSubmitting} className="flex-1 py-3">
                                {editingServiceId ? 'Update Service' : 'Create Service'}
                            </Button>
                        </div>
                    </form>
                </Modal>
            )}

            {/* Click outside to close dropdown */}
            {deleteState.isOpen && (
                <div className="fixed inset-0 z-40" onClick={() => setDeleteState(prev => ({ ...prev, isOpen: false }))} />
            )}
        </div>
    );
};

// Service Card Component
const ServiceCard = ({ service, onEdit, onToggle }) => {
    const detailRows = [
        { icon: Clock, iconColor: 'text-blue-500', label: 'Rate / minute', value: formatCurrency(service.ratePerMinute) },
        { icon: Wallet, iconColor: 'text-purple-500', label: 'Min Balance', value: formatCurrency(service.minBalanceRequired) },
    ];

    return (
        <Card hover className={`relative border-2 ${service.isActive ? 'border-gray-100 hover:border-blue-200' : 'border-gray-100 bg-gray-50/50 opacity-80'}`}>
            <div className="absolute top-5 right-5">
                <StatusBadge variant={service.isActive ? 'success' : 'default'}>
                    {service.isActive ? 'Active' : 'Inactive'}
                </StatusBadge>
            </div>

            <div className="flex items-start gap-4 mb-5">
                <IconBox icon={Package} variant={service.isActive ? 'gradient' : 'gray'} size="lg" />
                <h3 className="flex-1 min-w-0 pr-16 text-lg font-bold text-gray-900 truncate">{service.name}</h3>
            </div>

            <div className="space-y-3 mb-5">
                {detailRows.map((row) => (
                    <DetailRow key={row.label} {...row} />
                ))}
                {service.qrCodeId && (
                    <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-xl">
                        <QrCode className="w-4 h-4 text-orange-500" />
                        <span className="font-mono text-xs text-orange-700 truncate flex-1">{service.qrCodeId}</span>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                <Button onClick={onEdit} variant="secondary" size="sm" className="flex-1">
                    <Edit2 className="w-4 h-4" />Edit
                </Button>
                <Button
                    onClick={onToggle}
                    variant={service.isActive ? 'outline' : 'success'}
                    size="sm"
                    className="flex-1"
                >
                    {service.isActive ? <><ToggleRight className="w-4 h-4" />Disable</> : <><ToggleLeft className="w-4 h-4" />Enable</>}
                </Button>
            </div>
        </Card>
    );
};

// Detail Row Component
const DetailRow = ({ icon: Icon, iconColor, label, value }) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
        <div className="flex items-center gap-2 text-sm text-gray-600">
            <Icon className={`w-4 h-4 ${iconColor}`} />
            <span>{label}</span>
        </div>
        <span className="font-bold text-gray-900">{value}</span>
    </div>
);

// Form Input Component
const FormInput = ({ label, name, type = "text", value, onChange, placeholder, hint }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{label} *</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            step={type === "number" ? "0.01" : undefined}
            min={type === "number" ? "0" : undefined}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
    </div>
);

export default Services;
