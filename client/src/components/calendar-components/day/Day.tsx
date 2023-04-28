import React from "react";

import { setShowDayPreview } from "../../../store/reducers/calendar/calendarSlice";

import "./Day.styles.scss";

interface DayProps {
  day: Date;
  date: Date;
  past?: boolean;
  otherMonth?: boolean;
}

const Day = ({ day, date, past, otherMonth }: DayProps) => {
  const handleShowDayPreview = () => {
    setShowDayPreview(true);
  };

  return (
    <div
      className={`day ${
        day <= date && day.toDateString() !== date.toDateString() ? "past" : ""
      }`}
      onClick={handleShowDayPreview}
    >
      <div
        className={`date ${otherMonth ? "other-month" : ""} ${
          day.toDateString() === date.toDateString() ? "today" : ""
        }`}
      >
        {day.getDate()}
      </div>
    </div>
  );
};

export default Day;
