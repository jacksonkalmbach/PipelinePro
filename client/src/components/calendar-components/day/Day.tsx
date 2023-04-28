import React from "react";
import { useDispatch } from "react-redux";

import Event from "../event/Event";

import {
  setShowDayPreview,
  setDatePreview,
} from "../../../store/reducers/calendar/calendarSlice";

import "./Day.styles.scss";

interface DayProps {
  day: Date;
  date: Date;
  past?: boolean;
  otherMonth?: boolean;
}

const Day = ({ day, date, past, otherMonth }: DayProps) => {
  const dispatch = useDispatch();

  const handleShowDayPreview = () => {
    dispatch(setShowDayPreview(true));
    dispatch(setDatePreview(day));
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
      <Event eventName="Event 1" />
      <Event eventName="Event 2" />
    </div>
  );
};

export default Day;
