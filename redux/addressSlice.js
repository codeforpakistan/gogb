
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import pb from '../pocketbaseClient'; 

// Async thunk to fetch addresses
export const fetchAddresses = createAsyncThunk('addresses/fetch', async (_, { getState }) => {
  const state = getState();
  const { addresses } = state.addresses;

  // Check if data is already in the state
  if (addresses.length > 0) {
    return addresses;
  }

  // Fetch data from PocketBase if not in the state
  const records = await pb.collection('gogb_addresses').getFullList();
  return records;
});

const addressSlice = createSlice({
  name: 'addresses',
  initialState: {
    addresses: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddresses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.addresses = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default addressSlice.reducer;
