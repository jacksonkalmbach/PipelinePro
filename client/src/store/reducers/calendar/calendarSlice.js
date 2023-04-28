import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showDayPreview: false,
  datePreview: null,
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setShowDayPreview: (state, action) => {
      state.showDayPreview = action.payload;
    },
    setDatePreview: (state, action) => {
      state.datePreview = action.payload;
    },
  },
});

export const { setShowDayPreview, setDatePreview } = calendarSlice.actions;

export default calendarSlice.reducer;
