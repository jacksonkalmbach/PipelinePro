import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
  leadCount: 0,
};

export const selectAllLeadsSlice = createSlice({
  name: "selectAllLeads",
  initialState,
  reducers: {
    setSelectAllLeads: (state) => {
      state.value = !state.value;
    },
    setLeadCount: (state, action) => {
      state.leadCount = action.payload;
    },
  },
});

export const { setSelectAllLeads, setLeadCount } = selectAllLeadsSlice.actions;

export default selectAllLeadsSlice.reducer;
