import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showDayPreview: false,
  datePreview: null,
  yearMonthDay: "",
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
    setYearMonthDay: (state, action) => {
      state.yearMonthDay = action.payload;
    },
  },
});

export const { setShowDayPreview, setDatePreview, setYearMonthDay } =
  calendarSlice.actions;

export default calendarSlice.reducer;
