import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
  previewLead: false,
  previewId: null,
  confirmDelete: false,
  editLead: false,
};

export const showLeadSlice = createSlice({
  name: "showLead",
  initialState,
  reducers: {
    setShowCreateLead: (state, action) => {
      state.value = action.payload;
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
    showConfirmDelete: (state, action) => {
      state.confirmDelete = action.payload;
    },
    showEditLead: (state, action) => {
      state.editLead = action.payload;
    },
  },
});

export const {
  setShowCreateLead,
  setStartHidden,
  setShowLeadPreview,
  setPreviewId,
  showConfirmDelete,
  showEditLead,
} = showLeadSlice.actions;

export default showLeadSlice.reducer;
