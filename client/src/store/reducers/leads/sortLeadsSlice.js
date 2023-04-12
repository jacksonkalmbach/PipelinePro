import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sortAZ: false,
  sortZA: false,
  sortStatus: false,
  sortLeadOwner: false,
};

export const sortLeadsSlice = createSlice({
  name: "sortLeads",
  initialState,
  reducers: {
    setSortAZ: (state) => {
      state.value = !state.value;
    },
    setSortZA: (state) => {
      state.value = !state.value;
    },
    setSortStatus: (state) => {
      state.value = !state.value;
    },
    setSortLeadOwner: (state) => {
      state.value = !state.value;
    },
  },
});

export const { setSortAZ, setSortZA, setSortStatus, setSortLeadOwner } =
  sortLeadsSlice.actions;

export default sortLeadsSlice.reducer;
