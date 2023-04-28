import React from "react";
import { useDispatch } from "react-redux";
import { setShowDayPreview } from "../../../store/reducers/calendar/calendarSlice";

import "./DayPreview.styles.scss";

const DayPreview = () => {
  const dispatch = useDispatch();

  const closeDayPreview = () => {
    console.log("close");
    dispatch(setShowDayPreview(false));
  };

  return (
    <>
      <div className="overlay"></div>
      <div className="day-preview-container">
        DayPreview
        <button onClick={closeDayPreview}>Close</button>
      </div>
    </>
  );
};

export default DayPreview;
