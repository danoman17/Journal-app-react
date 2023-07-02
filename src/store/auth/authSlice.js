import { createSlice } from '@reduxjs/toolkit';

// Create a Redux slice named "authSlice"
export const authSlice = createSlice({
    name: 'auth', // Name of the slice
    initialState: {
        status: 'checking', // Authentication status: 'not-authenticated', 'checking', 'authenticated'
        uid: null, // User ID
        email: null, // User email
        displayName: null, // User display name
        photoURL: null, // User photo URL
        errorMessage: null, // Error message related to authentication
    },
    reducers: {
        // Reducer: login
        login: (state, { payload }) => {
            state.status = 'authenticated'; // Set status to 'authenticated'
            state.uid = payload.uid; // Set user ID
            state.email = payload.email; // Set user email
            state.displayName = payload.displayName; // Set user display name
            state.photoURL = payload.photoURL; // Set user photo URL
            state.errorMessage = null; // Clear error message
        },

        // Reducer: logout
        logout: (state, { payload }) => {
            state.status = 'not-authenticated'; // Set status to 'not-authenticated'
            state.uid = null; // Clear user ID
            state.email = null; // Clear user email
            state.displayName = null; // Clear user display name
            state.photoURL = null; // Clear user photo URL
            state.errorMessage = payload?.errorMessage; // Set error message if provided in the payload
        },

        // Reducer: chekingCredentials
        chekingCredentials: (state) => {
            state.status = 'checking'; // Set status to 'checking'
        },
    },
});

// Action creators are generated for each case reducer function
export const { login, logout, chekingCredentials } = authSlice.actions;
