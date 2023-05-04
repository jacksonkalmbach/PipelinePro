import React from "react";

import "./DashboardEvent.styles.scss";

interface DashboardEventProps {
  eventId?: string;
  eventTitle?: string;
  eventTime?: string;
  eventDescription?: string;
}

const DashboardEvent = ({
  eventTitle,
  eventTime,
  eventDescription,
  eventId,
}: DashboardEventProps) => {
  const eventTimeSplit = eventTime?.split(":");
  let eventHour = eventTimeSplit?.[0];
  const eventMinute = eventTimeSplit?.[1];
  let eventAmPm = "AM";

  if (Number(eventHour) > 12) {
    eventHour = (Number(eventHour) - 12).toString();
    eventAmPm = "PM";
  } else if (Number(eventHour) === 12) {
    eventAmPm = "PM";
  } else if (Number(eventHour) === 0) {
    eventHour = "12";
  }

  console.log("eventId - DashboardEvent.tsx", eventId);

  const handleEditEvent = () => {
    console.log("edit event");
  };

  const handleDeleteEvent = () => {
    try {
      fetch(`http://localhost:5001/events/${eventId}`, {
        method: "DELETE",
      });

      console.log("event deleted");
    } catch (error) {
      console.log("error deleting event in DashboardEvent.tsx");
    }
  };

  return (
    <div className="dashboard-event-container">
      <div className="time-container">
        <div className="time">
          {eventHour}:{eventMinute}
        </div>
        <div className="am-pm">{eventAmPm}</div>
      </div>
      <div className="body-container">
        <div className="body-container__title-description">
          <h4 className="title">{eventTitle}</h4>
          {eventDescription && (
            <p className="description">{eventDescription}</p>
          )}
        </div>
        <div className="body-container__edit-delete-event">
          <span className="material-symbols-outlined" onClick={handleEditEvent}>
            edit
          </span>
          <span
            className="material-symbols-outlined"
            onClick={handleDeleteEvent}
          >
            delete
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardEvent;
