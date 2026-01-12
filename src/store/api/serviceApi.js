import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = '/api/services';

export const serviceApi = createApi({
    reducerPath: 'serviceApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    tagTypes: ['Service'],
    endpoints: (builder) => ({
        // Get all services - GET /api/services
        getServices: builder.query({
            query: ({ storeId, isActive } = {}) => {
                const params = new URLSearchParams();
                if (storeId) params.append('storeId', storeId);
                if (isActive !== undefined) params.append('isActive', isActive);
                return `/${params.toString() ? `?${params.toString()}` : ''}`;
            },
            transformResponse: (response) => response.data,
            providesTags: ['Service'],
        }),

        // Get service by ID - GET /api/services/:id
        getServiceById: builder.query({
            query: (id) => `/${id}`,
            transformResponse: (response) => response.data,
            providesTags: (result, error, id) => [{ type: 'Service', id }],
        }),

        // Get service by QR code - GET /api/services/qr/:qrCodeId
        getServiceByQrCode: builder.query({
            query: (qrCodeId) => `/qr/${qrCodeId}`,
            transformResponse: (response) => response.data,
            providesTags: (result) => result ? [{ type: 'Service', id: result._id }] : [],
        }),

        // Create service - POST /api/services
        createService: builder.mutation({
            query: (serviceData) => ({
                url: '/',
                method: 'POST',
                body: serviceData,
            }),
            transformResponse: (response) => response.data,
            invalidatesTags: ['Service'],
        }),

        // Update service - PUT /api/services/:id
        updateService: builder.mutation({
            query: ({ id, ...serviceData }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: serviceData,
            }),
            transformResponse: (response) => response.data,
            invalidatesTags: (result, error, { id }) => [{ type: 'Service', id }, 'Service'],
        }),

        // Delete service - DELETE /api/services/:id
        deleteService: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            transformResponse: (response) => response.data,
            invalidatesTags: ['Service'],
        }),

        // Toggle service active status - PUT /api/services/:id
        toggleServiceStatus: builder.mutation({
            query: ({ id, isActive }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: { isActive },
            }),
            transformResponse: (response) => response.data,
            invalidatesTags: (result, error, { id }) => [{ type: 'Service', id }, 'Service'],
        }),
    }),
});

export const {
    useGetServicesQuery,
    useGetServiceByIdQuery,
    useGetServiceByQrCodeQuery,
    useCreateServiceMutation,
    useUpdateServiceMutation,
    useDeleteServiceMutation,
    useToggleServiceStatusMutation,
} = serviceApi;
