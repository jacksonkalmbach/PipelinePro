import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatPreview from "../../components/chat-components/chat-preview/ChatPreview";
import Conversation from "../../components/chat-components/conversation/Conversation";
import SearchBox from "../../components/search-box-component/SearchBox";
import { setNewChat } from "../../store/reducers/chat/chatSlice";

import "./Chat.styles.scss";

const Chat = () => {
  const dispatch = useDispatch();
  const newChat = useSelector((state: any) => state.chat.newChat);

  const handleNewConversation = () => {
    dispatch(setNewChat(true));
  };

  const handleClickChat = () => {
    dispatch(setNewChat(false));
  };

  const handleOpenChat = () => {
    console.log("open chat");
  };

  return (
    <div className="chat-container">
      <div className="chats">
        <div className="conversations">
          <h1 className="chat-title">
            Chats
            <div className="create-chat" onClick={handleNewConversation}>
              <span className="material-symbols-outlined">edit_square</span>
            </div>
          </h1>
          <div className="search-container">
            <SearchBox
              className="search-container"
              placeholder="Search Chats"
              onChangeHandler={() => {}}
            />
          </div>
          <div className="all-chats">
            {/* <ChatPreview senderId={} /> */}
            <ChatPreview senderId={1} onClick={handleClickChat} />
            <ChatPreview senderId={2} />
          </div>
        </div>
        <div className={`messages-container ${newChat && "new-chat"}`}>
          <Conversation id={0} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
