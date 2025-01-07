import { apiSlice } from "../../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: credentials => ({
                url: 'auth/login',
                method: 'POST',
                body: { ...credentials },
            }),
        }),
        register: builder.mutation({
            query: (body) => ({
                url: 'auth/register',
                method: 'POST',
                body,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: 'auth/logout',
                method: 'GET',
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApiSlice;