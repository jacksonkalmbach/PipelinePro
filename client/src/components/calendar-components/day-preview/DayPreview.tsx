import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowDayPreview } from "../../../store/reducers/calendar/calendarSlice";

import "./DayPreview.styles.scss";

const DayPreview = () => {
  const dispatch = useDispatch();
  const previewDate = useSelector((state: any) => state.calendar.datePreview);
  const day = previewDate.getDate();
  const month = previewDate.toLocaleString("default", { month: "long" });
  const year = previewDate.getFullYear();

  const closeDayPreview = () => {
    dispatch(setShowDayPreview(false));
  };

  return (
    <>
      <div className="overlay"></div>
      <div className="day-preview-container">
        <div className="day-preview-lead-header">
          <h1>{month + " " + day + ", " + year}</h1>
          <div className="close-preview-day-button" onClick={closeDayPreview}>
            Close
            <span className="material-symbols-outlined">close</span>
          </div>
        </div>
        <div className="day-preview-content">
          <div className="day-preview-content-header">
            <h2>Events</h2>
            <div className="add-event-button">
              <span className="material-symbols-outlined">add</span>
              <span>Add Event</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DayPreview;
