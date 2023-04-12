import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
  previewLead: false,
  previewId: null,
};

export const showLeadSlice = createSlice({
  name: "showLead",
  initialState,
  reducers: {
    setShowCreateLead: (state) => {
      state.value = !state.value;
    },
    setStartHidden: (state) => {
      state.value = false;
    },
    setShowLeadPreview: (state, action) => {
      state.previewLead = action.payload;
    },
    setPreviewId: (state, action) => {
      state.previewId = action.payload;
    },
  },
});

export const {
  setShowCreateLead,
  setStartHidden,
  setShowLeadPreview,
  setPreviewId,
} = showLeadSlice.actions;

export default showLeadSlice.reducer;
