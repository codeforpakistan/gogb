import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  inspections: [],
  offlineInspections: [],
  allInspections: [],
  currInspection:{}
};

const priceControlSlice = createSlice({
  name: 'priceControl',
  initialState,
  reducers: {
    addInspection: (state, action) => {
      state.inspections.push(action.payload);
    },
    updateInspection: (state, action) => {
      const index = state.inspections.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.inspections[index] = action.payload;
      }
    },
    setOfflineInspection: (state, action) => {
      const newInspection = action.payload;
      const existingInspection = state.offlineInspections.find(inspection => inspection.id === newInspection.id); 
      if (existingInspection) {
        // Update the existing inspection
        Object.assign(existingInspection, newInspection);
      } else {
        // Add the new inspection
        state.offlineInspections.push(newInspection);
      }
      // Update allInspections
      state.allInspections = [...state.inspections, ...state.offlineInspections];
    },
    clearOfflineInspections: (state) => {
      state.offlineInspections = [];
    },
    setInspections: (state, action) => {
      state.inspections = action.payload;
      state.allInspections = [...state.inspections, ...state.offlineInspections];
    },
    setCurrInspection: (state, action) => {
      state.currInspection = action.payload;
    },
  },
});

export const { addInspection, updateInspection, setOfflineInspection, clearOfflineInspections, setInspections, setCurrInspection} = priceControlSlice.actions;
export default priceControlSlice.reducer;