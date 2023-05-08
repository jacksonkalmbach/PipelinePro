import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
  previewLead: false,
  previewId: null,
  confirmDelete: false,
  deleteType: "",
  deleteId: "",
  editLead: false,
  showCompanyList: false,
  selectedCompanyName: "",
  selectedCompanyId: "",
};

export const showLeadSlice = createSlice({
  name: "showLead",
  initialState,
  reducers: {
    setShowCreateLead: (state, action) => {
      state.value = action.payload;
    },
    setShowCompanyList: (state, action) => {
      state.showCompanyList = action.payload;
    },
    setSelectedCompanyName: (state, action) => {
      state.selectedCompanyName = action.payload;
    },
    setSelectedCompanyId: (state, action) => {
      state.selectedCompanyId = action.payload;
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
    setDeleteType: (state, action) => {
      state.deleteType = action.payload;
    },
    setDeleteId: (state, action) => {
      state.deleteId = action.payload;
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
  setDeleteType,
  setDeleteId,
  showEditLead,
  setShowCompanyList,
  setSelectedCompanyName,
  setSelectedCompanyId,
} = showLeadSlice.actions;

export default showLeadSlice.reducer;
