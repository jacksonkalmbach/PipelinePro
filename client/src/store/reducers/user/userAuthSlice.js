import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDemo: false,
  isSignedIn: false,
  uid: "123",
  photoURL:
    "https://media.licdn.com/dms/image/D4E03AQFseatAMo8cnA/profile-displayphoto-shrink_800_800/0/1679333449150?e=1686182400&v=beta&t=KnDPBL4QdnoIym6nqOiOXUjI4LjgKVmimwwNEzod2cM",
  displayName: "Jackson Kalmbach",
  email: "jacksonrkalmbach@gmail.com",
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
} = userAuthSlice.actions;

export default userAuthSlice.reducer;
