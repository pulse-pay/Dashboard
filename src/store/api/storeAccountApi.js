import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = '/api/stores';

export const storeAccountApi = createApi({
    reducerPath: 'storeAccountApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    tagTypes: ['Store', 'Service'],
    endpoints: (builder) => ({
        // Store Signup - POST /api/stores
        signup: builder.mutation({
            query: (storeData) => ({
                url: '/',
                method: 'POST',
                body: storeData,
            }),
            transformResponse: (response) => response.data,
        }),

        // Store Login - POST /api/stores/login
        login: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
            transformResponse: (response) => response.data,
        }),

        // Get all stores - GET /api/stores
        getStores: builder.query({
            query: ({ storeType, verificationStatus } = {}) => {
                const params = new URLSearchParams();
                if (storeType) params.append('storeType', storeType);
                if (verificationStatus) params.append('verificationStatus', verificationStatus);
                return `/${params.toString() ? `?${params.toString()}` : ''}`;
            },
            transformResponse: (response) => response.data,
            providesTags: ['Store'],
        }),

        // Get store by ID - GET /api/stores/:id
        getStoreById: builder.query({
            query: (id) => `/${id}`,
            transformResponse: (response) => response.data,
            providesTags: (result, error, id) => [{ type: 'Store', id }],
        }),

        // Update store - PUT /api/stores/:id
        updateStore: builder.mutation({
            query: ({ id, ...storeData }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: storeData,
            }),
            transformResponse: (response) => response.data,
            invalidatesTags: (result, error, { id }) => [{ type: 'Store', id }, 'Store'],
        }),

        // Delete store - DELETE /api/stores/:id
        deleteStore: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            transformResponse: (response) => response.data,
            invalidatesTags: ['Store'],
        }),

        // Verify store - PUT /api/stores/:id/verify
        verifyStore: builder.mutation({
            query: ({ id, verificationStatus }) => ({
                url: `/${id}/verify`,
                method: 'PUT',
                body: { verificationStatus },
            }),
            transformResponse: (response) => response.data,
            invalidatesTags: (result, error, { id }) => [{ type: 'Store', id }, 'Store'],
        }),

        // Get store services - GET /api/stores/:storeId/services
        getStoreServices: builder.query({
            query: (storeId) => `/${storeId}/services`,
            transformResponse: (response) => response.data,
            providesTags: (result, error, storeId) => [{ type: 'Service', id: storeId }],
        }),
    }),
});

export const {
    useSignupMutation,
    useLoginMutation,
    useGetStoresQuery,
    useGetStoreByIdQuery,
    useUpdateStoreMutation,
    useDeleteStoreMutation,
    useVerifyStoreMutation,
    useGetStoreServicesQuery,
} = storeAccountApi;
