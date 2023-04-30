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
  onClick?: () => void;
  ai?: boolean;
}

const defaultSender = {
  id: 0,
  first_name: "",
  last_name: "",
  profile_pic: "",
};

interface Sender {
  id: number;
  first_name: string;
  last_name: string;
  profile_pic: string;
}

const ChatPreview = ({ senderId, onClick, ai }: ChatPreviewProps) => {
  const dispatch = useDispatch();
  const [sender, setSender] = useState<Sender>(defaultSender);
  const [isLoaded, setIsLoaded] = useState(false);
  const [lastMessage, setLastMessage] = useState("");

  const handleChatPreviewClick = () => {
    dispatch(setShowAllChats(false));
    dispatch(setConversationId(senderId));
    dispatch(setNewChat(false));
  };

  useEffect(() => {
    try {
      fetch(`http://localhost:5001/messages/conversation/1`)
        .then((res) => res.json())
        .then((data) => {
          setLastMessage(data[data.length - 1].message_body);
        });
    } catch (error) {
      console.log("error fetching sender", error);
    }
  }, [senderId]);

  return (
    <div className="chat-preview-container" onClick={handleChatPreviewClick}>
      {isLoaded && (
        <EmployeeSelect
          id={senderId}
          firstName={sender.first_name}
          lastName={sender.last_name}
          profilePic={sender.profile_pic}
        />
      )}
      <div className="last-message">{lastMessage}</div>
    </div>
  );
};

export default ChatPreview;
