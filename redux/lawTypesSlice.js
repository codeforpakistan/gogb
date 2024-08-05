import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import pb from '../pocketbaseClient'; 

// Async thunk to fetch law incident types
export const fetchLawTypes = createAsyncThunk('lawTypes/fetch', async (_, { getState }) => {
  const state = getState();
  const { lawTypes } = state.lawTypes;

  // Check if data is already in the state
  if (lawTypes.length > 0) {
    return lawTypes;
  }

  // Fetch data from PocketBase if not in the state
  const records = await pb.collection('gogb_law_types').getFullList();
  return records;
});

const lawTypesSlice = createSlice({
  name: 'lawTypes',
  initialState: {
    lawTypes: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLawTypes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLawTypes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lawTypes = action.payload;
      })
      .addCase(fetchLawTypes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default lawTypesSlice.reducer;
