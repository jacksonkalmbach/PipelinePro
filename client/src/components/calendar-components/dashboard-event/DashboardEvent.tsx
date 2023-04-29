import React from "react";

import "./DashboardEvent.styles.scss";

interface DashboardEventProps {
  eventTitle?: string;
  eventTime?: string;
}

const DashboardEvent = ({ eventTitle, eventTime }: DashboardEventProps) => {
  const eventTimeSplit = eventTime?.split(":");
  let eventHour = eventTimeSplit?.[0];
  const eventMinute = eventTimeSplit?.[1];
  let eventAmPm = "AM";

  // convert military time to standard time
  if (Number(eventHour) > 12) {
    eventHour = (Number(eventHour) - 12).toString();
    eventAmPm = "PM";
  } else if (Number(eventHour) === 12) {
    eventAmPm = "PM";
  } else if (Number(eventHour) === 0) {
    eventHour = "12";
  }

  return (
    <div className="dashboard-event-container">
      <div className="time-container">
        <div className="time">
          {eventHour}:{eventMinute}
        </div>
        <div className="am-pm">{eventAmPm}</div>
      </div>
      <div className="body-container">{eventTitle}</div>
    </div>
  );
};

export default DashboardEvent;
