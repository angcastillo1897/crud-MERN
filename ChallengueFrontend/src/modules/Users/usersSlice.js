import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        usersResponse: {
            users: [],
            total: 0,
            limit: 10,
            page: 1,
            isLoadingUsers: false,
            error: null,
            fullNameFilter: ''
        }
    },
    reducers: {
        setUsersResponseInfo: (state, action) => {
            // console.log("setUsersResponseInfo", action.payload);
            const { payload } = action;
            Object.keys(payload).forEach((key) => {
                state.usersResponse[key] = payload[key];
            });
        },
        setUsersLoading: (state, action) => {
            state.usersResponse.isLoadingUsers = action.payload
        },
        setPagination: (state, action) => {
            const { page, limit, fullNameFilter = '' } = action.payload;
            console.log("setPagination", page, limit, fullNameFilter);

            state.usersResponse.page = page;
            state.usersResponse.limit = limit;
            state.usersResponse.fullNameFilter = fullNameFilter
        },
        setUserById: (state, action) => {
            const { id, ...userInfo } = action.payload;
            state.usersResponse.users = state.usersResponse.users.map(user => user.id === id ? { ...user, ...userInfo } : user);
        },

    }
});


export const {
    setUsersResponseInfo,
    setUsersLoading,
    setPagination,
    setUserById
} = usersSlice.actions;

export default usersSlice.reducer;