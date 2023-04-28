import React from "react";

import { useSelector } from "react-redux";

import SearchBox from "../../search-box-component/SearchBox";
import Message from "../message-component/Message";

import "./Conversation.styles.scss";

const Conversation = () => {
  const newChat = useSelector((state: any) => state.chat.newChat);

  return (
    <div className="conversation-container">
      {newChat ? (
        <>
          <div className="send-to">
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
            <button>Send</button>
          </div>
        </>
      ) : (
        <>Old Chat</>
      )}
    </div>
  );
};

export default Conversation;
