import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setNewChat,
  setShowAllChats,
} from "../../../store/reducers/chat/chatSlice";

import SearchBox from "../../search-box-component/SearchBox";
import Message from "../message-component/Message";

import "./Conversation.styles.scss";

interface ConversationProps {
  id?: number;
}

const Conversation = ({ id }: ConversationProps) => {
  const dispatch = useDispatch();
  const newChat = useSelector((state: any) => state.chat.newChat);
  const showAllChats = useSelector((state: any) => state.chat.showAllChats);

  const backtoAllChats = () => {
    dispatch(setNewChat(false));
    dispatch(setShowAllChats(true));
  };

  return (
    <div className="conversation-container">
      {!showAllChats && (
        <>
          {newChat ? (
            <>
              <div className="send-to">
                <span
                  className="material-symbols-outlined"
                  onClick={backtoAllChats}
                >
                  arrow_back_ios
                </span>
                To:
                <div className="search-container">
                  <SearchBox
                    className="search-box"
                    placeholder=""
                    onChangeHandler={() => {}}
                  />
                </div>
              </div>
              <div className="messages-container">
                <Message message="Hello" sender="me" type="received" />
                <Message message="Howdy" sender="me" type="sent" />
              </div>
              <div className="new-message">
                <input className="write-message" placeholder="Aa" />
                <button className="send-button">Send</button>
                <span className="material-symbols-outlined">arrow_upward</span>
              </div>
            </>
          ) : (
            <>Old Chat</>
          )}
        </>
      )}
    </div>
  );
};

export default Conversation;
