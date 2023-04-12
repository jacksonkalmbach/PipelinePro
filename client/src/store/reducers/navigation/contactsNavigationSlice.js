import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "Leads",
};

export const contactsNavigationSlice = createSlice({
  name: "contactsNavigation",
  initialState,
  reducers: {
    setContactsNavigation: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setContactsNavigation } = contactsNavigationSlice.actions;

export default contactsNavigationSlice.reducer;
