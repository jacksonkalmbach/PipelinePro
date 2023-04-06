import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const selectAllLeadsSlice = createSlice({
  name: "selectAllLeads",
  initialState,
  reducers: {
    setSelectAllLeads: (state) => {
      state.value = !state.value;
    },
  },
});

export const { setSelectAllLeads } = selectAllLeadsSlice.actions;

export default selectAllLeadsSlice.reducer;
