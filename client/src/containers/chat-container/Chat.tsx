import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatPreview from "../../components/chat-components/chat-preview/ChatPreview";
import Conversation from "../../components/chat-components/conversation/Conversation";
import LeadOwnerSearchList from "../../components/lead-components/lead-owner-search-list/LeadOwnerSearchList";
import SearchBox from "../../components/search-box-component/SearchBox";
import {
  setConversationId,
  setNewChat,
  setShowAllChats,
} from "../../store/reducers/chat/chatSlice";

import "./Chat.styles.scss";

const Chat = () => {
  const dispatch = useDispatch();

  const [allUsers, setAllUsers] = useState([]);

  const newChat = useSelector((state: any) => state.chat.newChat);
  const showAllChats = useSelector((state: any) => state.chat.showAllChats);
  const currentUser = useSelector((state: any) => state.userAuth.uid);
  const [allConversations, setAllConversations] = useState([]);
  const selectedConversationId = useSelector(
    (state: any) => state.chat.conversationId
  );

  

  const handleNewConversation = () => {
    dispatch(setNewChat(true));
    dispatch(setShowAllChats(false));
    dispatch(setConversationId(0));
  };

  const handleClickChat = () => {
    dispatch(setNewChat(false));
  };

  const handleOpenChat = () => {
    console.log("open chat");
  };

  useEffect(() => {
    try {
      fetch(`http://localhost:5001/chat/user/${currentUser}`)
        .then((res) => res.json())
        .then((data) => {
          setAllConversations(data);
        });
    } catch (error) {}
  }, [currentUser]);

  return (
    <div className="chat-container">
      <div className="chats">
        <div className={`conversations ${!showAllChats && "hide"}`}>
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
            {allConversations.map((conversation: any) => {
              const uniqueKey =
                conversation.id + conversation.user_1 + conversation.user_2;
              return (
                <ChatPreview
                  key={uniqueKey}
                  conversation_id={conversation.id}
                  senderId={
                    conversation.user_1 === currentUser
                      ? conversation.user_2
                      : conversation.user_1
                  }
                />
              );
            })}
          </div>
        </div>
        <div className={`messages-container ${newChat && "new-chat"}`}>
          {selectedConversationId !== 0 ? (
            <>
              <Conversation id={selectedConversationId} />
            </>
          ) : (
            <>
              <Conversation newChat />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
