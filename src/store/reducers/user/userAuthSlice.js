import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSignedIn: false,
  uid: "",
  photoURL: "",
  displayName: "",
  email: "",
};

export const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    userSignIn: (state) => {
      state.isSignedIn = true;
    },
    userSignOut: (state) => {
      state.isSignedIn = false;
    },
    setUserUid: (state, action) => {
      state.uid = action.payload;
    },
    setUserPhoto: (state, action) => {
      state.photoURL = action.payload;
    },
    setUserDisplayName: (state, action) => {
      state.displayName = action.payload;
    },
    setUserEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const {
  userSignIn,
  userSignOut,
  setUserUid,
  setUserPhoto,
  setUserDisplayName,
  setUserEmail,
} = userAuthSlice.actions;

export default userAuthSlice.reducer;
