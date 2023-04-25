import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectAll: false,
  leadCount: 0,
  selectedLeads: [],
};

export const selectAllLeadsSlice = createSlice({
  name: "selectAllLeads",
  initialState,
  reducers: {
    setSelectAllLeads: (state, action) => {
      state.value = action.payload;
    },
    setLeadCount: (state, action) => {
      state.leadCount = action.payload;
    },
    addSelectedLeads: (state, action) => {
      return {
        ...state,
        selectedLeads: [...state.selectedLeads, action.payload],
      };
    },
    removeSelectedLeads: (state, action) => {
      const index = state.selectedLeads.indexOf(action.payload);
      if (index > -1) {
        state.selectedLeads.splice(index, 1);
      }
    },
    unSelectAllLeads: (state) => {
      state.value = false;
      state.selectedLeads = [];
    },
  },
});

export const {
  setSelectAllLeads,
  setLeadCount,
  addSelectedLeads,
  removeSelectedLeads,
  unSelectAllLeads,
} = selectAllLeadsSlice.actions;

export default selectAllLeadsSlice.reducer;
