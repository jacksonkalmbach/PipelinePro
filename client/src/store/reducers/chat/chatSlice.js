import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newChat: false,
  conversationId: 0,
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
  },
});

export const { setNewChat, setConversationId } = chatSlice.actions;

export default chatSlice.reducer;
