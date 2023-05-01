import React from "react";
import { useSelector } from "react-redux";

import "./Message.styles.scss";

interface MessageProps {
  message: string;
  sender: string;
  recipient: string;
  conversationId: number;
}

const Message = ({
  message,
  sender,
  recipient,
  conversationId,
}: MessageProps) => {
  const currentUserId = useSelector((state: any) => state.userAuth.uid);

  return (
    <>
      <div
        className={`message-container ${
          sender === currentUserId ? "sent" : "received"
        }`}
      >
        {message}
      </div>
    </>
  );
};

export default Message;
