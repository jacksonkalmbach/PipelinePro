import { configureStore } from "@reduxjs/toolkit";
import sectionNavigationSlice from "./reducers/navigation/sectionNavigationSlice";

const store = configureStore({
  reducer: {
    sectionNavigation: sectionNavigationSlice,
  },
});

export default store;
