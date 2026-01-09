import { configureStore } from '@reduxjs/toolkit';
import { storeAccountApi } from './api/storeAccountApi';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    [storeAccountApi.reducerPath]: storeAccountApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(storeAccountApi.middleware),
});

export default store;
