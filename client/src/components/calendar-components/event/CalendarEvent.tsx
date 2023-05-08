import React from "react";

import "./CalendarEvent.styles.scss";

interface CalendarEventProps {
  eventName: string | undefined;
}

const CalendarEvent = ({ eventName }: CalendarEventProps) => {
  return (
    <div className="event-container">
      <div className="event-title">
        <div className="bullet-point">&#9632;</div>
        <div className="event-name">{eventName}</div>
      </div>
    </div>
  );
};

export default CalendarEvent;
