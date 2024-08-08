import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activities: [],
  offlineActivities: [],
  allActivities: [],
  currActivity:{}
};

const lawSlice = createSlice({
  name: 'law',
  initialState,
  reducers: {
    addActivity: (state, action) => {
      state.activities.push(action.payload);
    },
    updateActivity: (state, action) => {
      const index = state.activities.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.activities[index] = action.payload;
      }
    },
    setOfflineActivity: (state, action) => {
      const newActivity = action.payload;
      const existingActivity = state.offlineActivities.find(activity => activity.id === newActivity.id); 
      if (existingActivity) {
        // Update the existing activity
        Object.assign(existingActivity, newActivity);
      } else {
        // Add the new activity
        state.offlineActivities.push(newActivity);
      }
      // Update allActivities
      state.allActivities = [...state.activities, ...state.offlineActivities];
    },
    clearOfflineActivities: (state) => {
      state.offlineActivities = [];
    },
    setActivities: (state, action) => {
      state.activities = action.payload;
      state.allActivities = [...state.activities, ...state.offlineActivities];
    },
    setCurrActivity: (state, action) => {
      state.currActivity = action.payload;
    },
  },
});

export const { addActivity, updateActivity, setOfflineActivity, clearOfflineActivities, setActivities, setCurrActivity} = lawSlice.actions;
export default lawSlice.reducer;


