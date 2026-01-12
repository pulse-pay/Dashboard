import { createSlice } from '@reduxjs/toolkit';
import { serviceApi } from '../api/serviceApi';

const initialState = {
    services: [],
    selectedService: null,
    isLoading: false,
    error: null,
    // Form state for creating/editing services
    formData: {
        name: '',
        ratePerMinute: '',
        minBalanceRequired: '',
    },
    isFormOpen: false,
    editingServiceId: null,
};

const servicesSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {
        setServices: (state, action) => {
            state.services = action.payload;
        },
        setSelectedService: (state, action) => {
            state.selectedService = action.payload;
        },
        clearSelectedService: (state) => {
            state.selectedService = null;
        },
        // Form management
        setFormData: (state, action) => {
            state.formData = { ...state.formData, ...action.payload };
        },
        resetFormData: (state) => {
            state.formData = {
                name: '',
                ratePerMinute: '',
                minBalanceRequired: '',
            };
            state.editingServiceId = null;
        },
        openForm: (state, action) => {
            state.isFormOpen = true;
            if (action.payload) {
                // Editing existing service
                state.editingServiceId = action.payload._id;
                state.formData = {
                    name: action.payload.name,
                    ratePerMinute: action.payload.ratePerMinute.toString(),
                    minBalanceRequired: action.payload.minBalanceRequired.toString(),
                };
            }
        },
        closeForm: (state) => {
            state.isFormOpen = false;
            state.formData = {
                name: '',
                ratePerMinute: '',
                minBalanceRequired: '',
            };
            state.editingServiceId = null;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Get services
            .addMatcher(
                serviceApi.endpoints.getServices.matchPending,
                (state) => {
                    state.isLoading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                serviceApi.endpoints.getServices.matchFulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.services = action.payload;
                }
            )
            .addMatcher(
                serviceApi.endpoints.getServices.matchRejected,
                (state, action) => {
                    state.isLoading = false;
                    state.error = action.error?.message || 'Failed to fetch services';
                }
            )
            // Create service
            .addMatcher(
                serviceApi.endpoints.createService.matchPending,
                (state) => {
                    state.isLoading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                serviceApi.endpoints.createService.matchFulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.services.push(action.payload);
                    state.isFormOpen = false;
                    state.formData = {
                        name: '',
                        ratePerMinute: '',
                        minBalanceRequired: '',
                    };
                }
            )
            .addMatcher(
                serviceApi.endpoints.createService.matchRejected,
                (state, action) => {
                    state.isLoading = false;
                    state.error = action.error?.message || 'Failed to create service';
                }
            )
            // Update service
            .addMatcher(
                serviceApi.endpoints.updateService.matchFulfilled,
                (state, action) => {
                    const index = state.services.findIndex(s => s._id === action.payload._id);
                    if (index !== -1) {
                        state.services[index] = action.payload;
                    }
                    state.isFormOpen = false;
                    state.editingServiceId = null;
                    state.formData = {
                        name: '',
                        ratePerMinute: '',
                        minBalanceRequired: '',
                    };
                }
            )
            // Delete service
            .addMatcher(
                serviceApi.endpoints.deleteService.matchFulfilled,
                (state, action) => {
                    state.services = state.services.filter(s => s._id !== action.meta.arg.originalArgs);
                }
            )
            // Toggle service status
            .addMatcher(
                serviceApi.endpoints.toggleServiceStatus.matchFulfilled,
                (state, action) => {
                    const index = state.services.findIndex(s => s._id === action.payload._id);
                    if (index !== -1) {
                        state.services[index] = action.payload;
                    }
                }
            );
    },
});

export const {
    setServices,
    setSelectedService,
    clearSelectedService,
    setFormData,
    resetFormData,
    openForm,
    closeForm,
    setError,
    clearError,
} = servicesSlice.actions;

export default servicesSlice.reducer;
