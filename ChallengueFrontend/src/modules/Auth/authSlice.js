import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: localStorage.getItem('token') || null,
        isLoading: false,
        isRegisterLoading: false
    },
    reducers: {
        setCredentials: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            localStorage.setItem('token', token);
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        },
        setUser: (state, action) => {
            const { user } = action.payload
            state.user = user
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setIsRegisterLoading: (state, action) => {
            state.isRegisterLoading = action.payload;
        }
    }
});


export const {
    setCredentials,
    setUser,
    setIsLoading,
    setIsRegisterLoading,
    logOut
} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;