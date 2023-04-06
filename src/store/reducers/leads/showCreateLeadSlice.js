import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const showCreateLeadSlice = createSlice({
  name: "showCreateLead",
  initialState,
  reducers: {
    setShowCreateLead: (state) => {
      state.value = !state.value;
    },
    setStartHidden: (state) => {
      state.value = false;
    },
  },
});

export const { setShowCreateLead, setStartHidden } =
  showCreateLeadSlice.actions;

export default showCreateLeadSlice.reducer;
