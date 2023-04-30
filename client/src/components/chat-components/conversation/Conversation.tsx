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
}

interface SenderData {
  id: number;
  first_name: string;
  last_name: string;
  profile_pic: string;
}

const defaultMessageData = {
  message_id: 0,
  message_body: "",
  message_recipient: 0,
  message_sender: 0,
  conversation_id: 0,
};

const Conversation = ({ id }: ConversationProps) => {
  const dispatch = useDispatch();
  const senderId = useSelector((state: any) => state.chat.conversationId);
  const [allMessages, setAllMessages] = useState([defaultMessageData]);
  const newChat = useSelector((state: any) => state.chat.newChat);
  const showAllChats = useSelector((state: any) => state.chat.showAllChats);

  const backtoAllChats = () => {
    dispatch(setNewChat(false));
    dispatch(setShowAllChats(true));
  };

  useEffect(() => {
    try {
      fetch(`http://localhost:5001/messages/conversation/1`)
        .then((res) => res.json())
        .then((data) => {
          setAllMessages(data);
        });
    } catch (error) {
      console.log("error fetching conversation", error);
    }
  }, [senderId]);

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
              {allMessages.map((message) => (
                <Message
                  key={message.message_id}
                  message={message.message_body}
                  recipient={message.message_recipient}
                  sender={message.message_sender}
                  conversationId={message.conversation_id}
                />
              ))}
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
