import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newChat: false,
  conversationId: 0,
  showAllChats: true,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setNewChat: (state, action) => {
      state.newChat = action.payload;
    },
    setConversationId: (state, action) => {
      state.conversationId = action.payload;
    },
    setShowAllChats: (state, action) => {
      state.showAllChats = action.payload;
    },
  },
});

export const { setNewChat, setConversationId, setShowAllChats } =
  chatSlice.actions;

export default chatSlice.reducer;
