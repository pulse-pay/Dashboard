import { configureStore } from '@reduxjs/toolkit';
import { storeAccountApi } from './api/storeAccountApi';
import authReducer from './slices/authSlice';
import clientsReducer from './slices/clientsSlice';

export const store = configureStore({
  reducer: {
    [storeAccountApi.reducerPath]: storeAccountApi.reducer,
    auth: authReducer,
    clients: clientsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(storeAccountApi.middleware),
});

export default store;
