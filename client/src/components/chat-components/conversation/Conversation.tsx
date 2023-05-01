import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setNewChat,
  setShowAllChats,
} from "../../../store/reducers/chat/chatSlice";
import EmployeeSelect from "../../employee-components/employee-select/EmployeeSelect";

import SearchBox from "../../search-box-component/SearchBox";
import Message from "../message-component/Message";

import "./Conversation.styles.scss";

interface ConversationProps {
  id?: number;
  newChat?: boolean;
}

const defaultMessageData = {
  id: "",
  message_body: "",
  recipient: "",
  sender: "",
  conversation_id: 0,
};

const Conversation = ({ id, newChat }: ConversationProps) => {
  const dispatch = useDispatch();
  const [allMessages, setAllMessages] = useState([defaultMessageData]);
  const showAllChats = useSelector((state: any) => state.chat.showAllChats);

  const backtoAllChats = () => {
    dispatch(setNewChat(false));
    dispatch(setShowAllChats(true));
  };

  useEffect(() => {
    if (!newChat) {
      try {
        fetch(`http://localhost:5001/chat/conversation/${id}`)
          .then((res) => res.json())
          .then((data) => {
            setAllMessages(data);
          });
      } catch (error) {
        console.log("error fetching conversation", error);
      }
    }
  }, [id, newChat]);

  return (
    <div className="conversation-container">
      {!showAllChats && (
        <>
          <>
            <div className="send-to">
              <span
                className="material-symbols-outlined"
                onClick={backtoAllChats}
              >
                arrow_back_ios
              </span>
              {newChat ? (
                <>
                  To:
                  <div className="search-container">
                    <SearchBox
                      className="search-box"
                      placeholder=""
                      onChangeHandler={() => {}}
                    />
                  </div>
                </>
              ) : (
                <div className="employee-name">
                  {/* <EmployeeSelect
                    id={1}
                    firstName={
                      senderData.first_name.length > 1
                        ? senderData.first_name
                        : ""
                    }
                    lastName={
                      senderData.last_name.length > 1
                        ? senderData.last_name
                        : ""
                    }
                    profilePic={
                      senderData.profile_pic.length > 1
                        ? senderData.profile_pic
                        : ""
                    }
                  /> */}
                </div>
              )}
            </div>
            <div className="messages-container">
              {allMessages[0].id.length > 0 ? (
                <>
                  {allMessages.map((message) => {
                    const { id, message_body, sender, recipient } = message;
                    return (
                      <Message
                        key={id}
                        message={message_body}
                        recipient={recipient}
                        sender={sender}
                        conversationId={message.conversation_id}
                      />
                    );
                  })}
                </>
              ) : (
                <div className="no-messages">No messages yet</div>
              )
            }
            </div>
            <div className="new-message">
              <input className="write-message" placeholder="Aa" />
              <button className="send-button">Send</button>
              <span className="material-symbols-outlined">arrow_upward</span>
            </div>
          </>
        </>
      )}
    </div>
  );
};

export default Conversation;
