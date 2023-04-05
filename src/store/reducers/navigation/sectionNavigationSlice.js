import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "Dashboard",
};

export const sectionNavigationSlice = createSlice({
  name: "sectionNavigation",
  initialState,
  reducers: {
    setSectionNavigation: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSectionNavigation } = sectionNavigationSlice.actions;

export default sectionNavigationSlice.reducer;
