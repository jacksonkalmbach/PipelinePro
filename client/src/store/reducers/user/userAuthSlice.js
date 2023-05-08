import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDemo: false,
  isSignedIn: false,
  uid: "346a931f-e182-4140-80c8-f96ef8f8a557",
  photoURL:
    "https://media.licdn.com/dms/image/D4E03AQFseatAMo8cnA/profile-displayphoto-shrink_800_800/0/1679333449150?e=1686182400&v=beta&t=KnDPBL4QdnoIym6nqOiOXUjI4LjgKVmimwwNEzod2cM",
  displayName: "Jackson Kalmbach",
  email: "jacksonrkalmbach@gmail.com",
  companyId: "e0ef6be4-785e-4d8a-b165-8b6e7eddb92f",
};

export const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setIsDemo: (state, action) => {
      state.isDemo = action.payload;
    },
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
    setCompanyId: (state, action) => {
      state.company_id = action.payload;
    },
  },
});

export const {
  setIsDemo,
  userSignIn,
  userSignOut,
  setUserUid,
  setUserPhoto,
  setUserDisplayName,
  setUserEmail,
  setCompanyId,
} = userAuthSlice.actions;

export default userAuthSlice.reducer;
