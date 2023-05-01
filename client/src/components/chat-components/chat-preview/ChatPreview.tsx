import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setConversationId,
  setNewChat,
  setShowAllChats,
} from "../../../store/reducers/chat/chatSlice";
import EmployeeSelect from "../../employee-components/employee-select/EmployeeSelect";

import "./ChatPreview.styles.scss";

interface ChatPreviewProps {
  senderId?: number;
  conversation_id: string;
  onClick?: () => void;
}

const defaultSender = {
  id: 0,
  first_name: "",
  last_name: "",
  photo_url: "",
};

interface Sender {
  id: number;
  first_name: string;
  last_name: string;
  photo_url: string;
}

const ChatPreview = ({
  senderId,
  onClick,
  conversation_id,
}: ChatPreviewProps) => {
  const dispatch = useDispatch();
  const [sender, setSender] = useState<Sender>(defaultSender);
  const [isLoaded, setIsLoaded] = useState(false);
  const [lastMessage, setLastMessage] = useState("");
  const selectedConversationId = useSelector(
    (state: any) => state.chat.conversationId
  );

  const handleChatPreviewClick = () => {
    console.log("clicked");
    dispatch(setShowAllChats(false));
    dispatch(setConversationId(conversation_id));
    dispatch(setNewChat(false));
  };

  useEffect(() => {
    try {
      fetch(`http://localhost:5001/chat/conversation/${conversation_id}`)
        .then((res) => res.json())
        .then((data) => {
          setLastMessage(data[data.length - 1].message_body);
        });
    } catch (error) {
      console.log("error fetching sender", error);
    }
  }, [conversation_id]);

  useEffect(() => {
    try {
      fetch(`http://localhost:5001/users/${senderId}`)
        .then((res) => res.json())
        .then((data) => {
          setSender(data);
          setIsLoaded(true);
        });
    } catch (error) {
      console.log("error fetching sender", error);
    }
  }, [senderId]);

  console.log("selectedConversationId", selectedConversationId);

  return (
    <div className="chat-preview-container" onClick={handleChatPreviewClick}>
      {isLoaded && (
        <EmployeeSelect
          id={senderId}
          firstName={sender.first_name}
          lastName={sender.last_name}
          profilePic={sender.photo_url}
        />
      )}
      <div className="last-message">{lastMessage}</div>
    </div>
  );
};

export default ChatPreview;
