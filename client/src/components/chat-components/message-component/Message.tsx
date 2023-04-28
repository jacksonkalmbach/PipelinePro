import React from "react";

import "./Message.styles.scss";

interface MessageProps {
  message: string;
  sender: string;
  type: string;
}

const Message = ({ message, sender, type }: MessageProps) => {
  return (
    <>
      <div className={`message-container ${type}`}>{message}</div>
    </>
  );
};

export default Message;
