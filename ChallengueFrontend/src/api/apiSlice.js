import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from '../modules/Auth/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    // console.log("RESULT", result);

    if (result?.error?.status === 401) {
        console.log('sending refresh token');
        // send refresh token to get new access token
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
        // console.log('refreshResult', refreshResult);
        if (refreshResult?.data) {
            const user = api.getState().auth.user;
            // set new token
            api.dispatch(setCredentials({ ...refreshResult.data, user }));
            //* retry the original query with the new token
            result = await baseQuery(args, api, extraOptions);
        } else {
            console.log("LOGOUT");
            // logout from backend
            await baseQuery('/auth/logout', api, extraOptions);
            api.dispatch(logOut());
        }
    }
    return result;
}


export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
});
