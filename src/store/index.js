import { configureStore } from '@reduxjs/toolkit';
import { storeAccountApi } from './api/storeAccountApi';
import { serviceApi } from './api/serviceApi';
import authReducer from './slices/authSlice';
import clientsReducer from './slices/clientsSlice';
import servicesReducer from './slices/servicesSlice';

export const store = configureStore({
  reducer: {
    [storeAccountApi.reducerPath]: storeAccountApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
    auth: authReducer,
    clients: clientsReducer,
    services: servicesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(storeAccountApi.middleware)
      .concat(serviceApi.middleware),
});

export default store;
