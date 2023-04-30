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

const defaultSenderData = {
  id: 0,
  first_name: "",
  last_name: "",
  profile_pic: "",
};

const Conversation = ({ id }: ConversationProps) => {
  const dispatch = useDispatch();
  const senderId = useSelector((state: any) => state.chat.conversationId);
  const [senderData, setSenderData] = useState<SenderData>(defaultSenderData);
  const newChat = useSelector((state: any) => state.chat.newChat);
  const showAllChats = useSelector((state: any) => state.chat.showAllChats);

  const backtoAllChats = () => {
    dispatch(setNewChat(false));
    dispatch(setShowAllChats(true));
  };

  const messagesArray = [
    {
      id: 1,
      message: "Hello",
      sender: "me",
      type: "received",
    },
  ];

  useEffect(() => {
    try {
      fetch(`http://localhost:5001/employees/${senderId}`)
        .then((res) => res.json())
        .then((data) => {
          setSenderData(data);
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
                  <EmployeeSelect
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
                  />
                </div>
              )}
            </div>
            <div className="messages-container">
              {messagesArray.map((message) => (
                <Message
                  key={message.id}
                  message={message.message}
                  sender={message.sender}
                  type={message.type}
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
