import { createSlice } from '@reduxjs/toolkit';
import { storeAccountApi } from '../api/storeAccountApi';

const initialState = {
  // Dummy authorized client ID for QR code generation
  currentClientId: 'CLIENT-2026-DUMMY-001',
  authorizedClients: [],
  clients: [],
  isLoading: false,
  error: null,
};

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setCurrentClientId: (state, action) => {
      state.currentClientId = action.payload;
    },
    addAuthorizedClient: (state, action) => {
      state.authorizedClients.push(action.payload);
    },
    removeAuthorizedClient: (state, action) => {
      state.authorizedClients = state.authorizedClients.filter(
        (client) => client.id !== action.payload
      );
    },
    setClients: (state, action) => {
      state.clients = action.payload;
    },
    clearClients: (state) => {
      state.clients = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        storeAccountApi.endpoints.getStoreClients.matchPending,
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        storeAccountApi.endpoints.getStoreClients.matchFulfilled,
        (state, action) => {
          state.isLoading = false;
          state.clients = action.payload;
        }
      )
      .addMatcher(
        storeAccountApi.endpoints.getStoreClients.matchRejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.error?.message || 'Failed to fetch clients';
        }
      );
  },
});

export const { 
  setCurrentClientId, 
  addAuthorizedClient, 
  removeAuthorizedClient,
  setClients,
  clearClients,
} = clientsSlice.actions;

export const selectCurrentClientId = (state) => state.clients.currentClientId;
export const selectAuthorizedClients = (state) => state.clients.authorizedClients;
export const selectClients = (state) => state.clients.clients;
export const selectClientsLoading = (state) => state.clients.isLoading;
export const selectClientsError = (state) => state.clients.error;

export default clientsSlice.reducer;
