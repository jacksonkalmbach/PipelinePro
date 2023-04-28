import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showDayPreview: false,
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setShowDayPreview: (state, action) => {
      state.showDayPreview = action.payload;
    },
  },
});

export const { setShowDayPreview } = calendarSlice.actions;

export default calendarSlice.reducer;
