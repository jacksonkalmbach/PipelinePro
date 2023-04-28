import React from "react";
import { useDispatch } from "react-redux";
import Conversation from "../../components/chat-components/conversation/Conversation";
import SearchBox from "../../components/search-box-component/SearchBox";
import { setNewChat } from "../../store/reducers/chat/chatSlice";

import "./Chat.styles.scss";

const Chat = () => {
  const dispatch = useDispatch();
  const handleNewConversation = () => {
    dispatch(setNewChat(true));
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
        </div>
        <div className="messages-container">
          <Conversation />
        </div>
      </div>
    </div>
  );
};

export default Chat;
