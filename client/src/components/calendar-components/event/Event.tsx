import React from "react";

import "./Event.styles.scss";

interface EventProps {
  eventName: string;
}

const Event = ({ eventName }: EventProps) => {
  return (
    <div className="event-container">
      <div className="event-title">
        <div className="bullet-point">&#9632;</div>
        <div className="event-name">{eventName}</div>
      </div>
    </div>
  );
};

export default Event;
