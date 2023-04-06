import { configureStore } from "@reduxjs/toolkit";
import sectionNavigationSlice from "./reducers/navigation/sectionNavigationSlice";
import contactsNavigationSlice from "./reducers/navigation/contactsNavigationSlice";
import selectAllLeadsSlice from "./reducers/leads/selectAllLeadsSlice";

const store = configureStore({
  reducer: {
    sectionNavigation: sectionNavigationSlice,
    contactsNavigation: contactsNavigationSlice,
    selectAllLeads: selectAllLeadsSlice,
  },
});

export default store;
