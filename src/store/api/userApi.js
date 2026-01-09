import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:5001/api/users';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (userData) => ({
                url: '/',
                method: 'POST',
                body: userData,
            }),
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        getUsers: builder.query({
            query: () => '',
            providesTags: ['User'],
        }),
        getUserById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: 'User', id }],
        }),
        updateUser: builder.mutation({
            query: ({ id, ...userData }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: userData,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const {
    useLoginMutation,
    useSignupMutation,
    useGeQuery,
    useGetUserByIdQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = userApi;
