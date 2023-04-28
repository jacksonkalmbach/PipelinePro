import { configureStore } from "@reduxjs/toolkit";
import sectionNavigationSlice from "./reducers/navigation/sectionNavigationSlice";
import contactsNavigationSlice from "./reducers/navigation/contactsNavigationSlice";
import selectAllLeadsSlice from "./reducers/leads/selectAllLeadsSlice";
import showCreateLeadSlice from "./reducers/leads/showLeadSlice";
import sortLeadsSlice from "./reducers/leads/sortLeadsSlice";
import userAuthSlice from "./reducers/user/userAuthSlice";
import chatSlice from "./reducers/chat/chatSlice";

const store = configureStore({
  reducer: {
    sectionNavigation: sectionNavigationSlice,
    contactsNavigation: contactsNavigationSlice,
    selectAllLeads: selectAllLeadsSlice,
    showLead: showCreateLeadSlice,
    sortLeads: sortLeadsSlice,
    userAuth: userAuthSlice,
    chat: chatSlice,
  },
});

export default store;
