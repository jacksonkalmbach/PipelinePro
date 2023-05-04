import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowDayPreview } from "../../../store/reducers/calendar/calendarSlice";
import DashboardEvent from "../dashboard-event/DashboardEvent";
import NewEvent from "../new-event/NewEvent";

import "./DayPreview.styles.scss";

interface EventData {
  event_name: string;
  event_date: string;
  event_time: string;
  event_description: string;
  event_owner: string;
  lead: string | null;
  event_participants: string | null;
}

const defaultEventData = {
  event_name: "",
  event_date: "",
  event_time: "",
  event_description: "",
  event_owner: "",
  lead: null,
  event_participants: null,
};

const DayPreview = () => {
  const dispatch = useDispatch();
  const uid = useSelector((state: any) => state.userAuth.uid);
  const previewDate = useSelector((state: any) => state.calendar.datePreview);

  const [addNewEvent, setAddNewEvent] = useState(false);
  const [events, setEvents] = useState<EventData[]>([defaultEventData]);

  const closeDayPreview = () => {
    dispatch(setShowDayPreview(false));
  };

  const toggleNewEvent = () => {
    setAddNewEvent(!addNewEvent);
  };

  const date = new Date(previewDate);
  const formattedDate = date.toLocaleString("default", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const year = previewDate.slice(0, 4);
  const month = previewDate.slice(5, 7);
  const day = previewDate.slice(8, 10);
  const ymd = year + "-" + month + "-" + day;

  useEffect(() => {
    try {
      fetch(`http://localhost:5001/events/${ymd}/${uid}`)
        .then((res) => res.json())
        .then((data) => setEvents(data));
    } catch (error) {
      console.log("error getting events in DayPreview.tsx");
    }
  }, [ymd, uid]);

  return (
    <>
      <div className="overlay"></div>
      <div className="day-preview-container">
        <div className="day-preview-header">
          <h1 className="day-preview-header__title">{formattedDate}</h1>
          <div
            className="day-preview-header__close-button"
            onClick={closeDayPreview}
          >
            Close
            <span className="material-symbols-outlined">close</span>
          </div>
        </div>
        <div className="day-preview-content">
          <div className="day-preview-content__header">
            <h2>Events</h2>
            <div className="add-event-button" onClick={toggleNewEvent}>
              {!addNewEvent ? (
                <>
                  <span className="material-symbols-outlined">add</span>
                  <span>Add Event</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">close</span>
                  <span>Close</span>
                </>
              )}
            </div>
          </div>
          {addNewEvent && <NewEvent />}
          {addNewEvent && <div className="divider"></div>}
          {events.length ? (
            events.map((event: any) => {
              const { id, event_name, event_time, event_description } = event;
              return (
                <div key={id} className="event-container">
                  <div className="event-title">
                    <DashboardEvent
                      key={id}
                      eventId={id}
                      eventTitle={event_name}
                      eventTime={event_time}
                      eventDescription={event_description}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default DayPreview;
