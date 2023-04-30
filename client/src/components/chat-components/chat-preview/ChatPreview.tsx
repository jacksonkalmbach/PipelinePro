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

  const handleChatPreviewClick = () => {
    dispatch(setShowAllChats(false));
    dispatch(setConversationId(senderId));
    dispatch(setNewChat(false));
  };

  useEffect(() => {
    if (!ai) {
      try {
        fetch(`http://localhost:5001/employees/${senderId}`)
          .then((res) => res.json())
          .then((data) => {
            setSender(data);
            setIsLoaded(true);
          });
      } catch (error) {
        console.log("error fetching chat preview", error);
      }
    }
  }, [senderId, ai]);

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
      <div className="last-message">Last message</div>
    </div>
  );
};

export default ChatPreview;
