import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';

/* 
    We export the slices we're usign for this App
 */
export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
})