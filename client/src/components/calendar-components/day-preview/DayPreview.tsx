import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowDayPreview } from "../../../store/reducers/calendar/calendarSlice";
import NewEvent from "../new-event/NewEvent";

import "./DayPreview.styles.scss";

const DayPreview = () => {
  const dispatch = useDispatch();

  const previewDate = useSelector((state: any) => state.calendar.datePreview);
  const day = previewDate.getDate();
  const month = previewDate.toLocaleString("default", { month: "long" });
  const year = previewDate.getFullYear();

  const [addNewEvent, setAddNewEvent] = useState(false);

  const closeDayPreview = () => {
    dispatch(setShowDayPreview(false));
  };

  const toggleNewEvent = () => {
    setAddNewEvent(!addNewEvent);
  };

  return (
    <>
      <div className="overlay"></div>
      <div className="day-preview-container">
        <div className="day-preview-header">
          <h1 className="day-preview-header__title">
            {month + " " + day + ", " + year}
          </h1>
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
        </div>
      </div>
    </>
  );
};

export default DayPreview;
