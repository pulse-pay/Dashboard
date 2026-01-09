import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    store: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { store } = action.payload;
            state.store = store;
            state.isAuthenticated = true;
            localStorage.setItem('auth', JSON.stringify({ store }));
        },
        updateStoreProfile: (state, action) => {
            if (state.store) {
                state.store = { ...state.store, ...action.payload };
                localStorage.setItem('auth', JSON.stringify({ store: state.store }));
            }
        },
        logout: (state) => {
            state.store = null;
            state.isAuthenticated = false;
            localStorage.removeItem('auth');
        },
        loadAuthFromStorage: (state) => {
            const auth = localStorage.getItem('auth');
            if (auth) {
                const { store } = JSON.parse(auth);
                state.store = store;
                state.isAuthenticated = true;
            }
        },
    },
});

export const { setCredentials, updateStoreProfile, logout, loadAuthFromStorage } = authSlice.actions;
export default authSlice.reducer;
