import { apiSlice } from "../../api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: ({ page = 1, limit = 10, fullNameFilter = '' }) => {
                return {
                    url: `/users?page=${page}&limit=${limit}&fullName=${fullNameFilter}`,
                    method: 'GET',
                    keepUnusedDataFor: 5,
                }
            },
        }),
        getUser: builder.query({
            query: () => ({
                url: '/user',
                method: 'GET',
            }),
        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            }),
        }),
        updateUser: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/users/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),
    }),
});

export const { useLazyGetUserQuery, useLazyGetUsersQuery, useDeleteUserMutation, useUpdateUserMutation } = usersApiSlice;