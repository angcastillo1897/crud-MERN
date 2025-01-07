import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../modules/Auth/authSlice'
import usersReducer from '../modules/Users/usersSlice'
import { apiSlice } from '../api/apiSlice'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        users: usersReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})