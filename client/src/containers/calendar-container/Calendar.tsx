import React, { useState, useEffect } from "react";

import "./Calendar.styles.scss";

const Calendar = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const [monthState, setMonthState] = useState(month);
  const [yearState, setYearState] = useState(year);
  const monthName = new Date(yearState, monthState - 1, 1).toLocaleString(
    "default",
    { month: "long" }
  );
  const daysInMonth = new Date(yearState, monthState, 0).getDate();
  const firstDayOfMonth = new Date(yearState, monthState - 1, 1).getDay();
  const days = [];

  useEffect(() => {
    setMonthState(month);
  }, [month]);

  for (let i = firstDayOfMonth; i > 0; i--) {
    const day = new Date(yearState, monthState - 1, -i + 1);
    days.push(
      <div
        className={`day ${
          day <= date && day.toDateString() !== date.toDateString()
            ? "past"
            : ""
        }`}
      >
        <div className="date other-month">{day.getDate()}</div>
      </div>
    );
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const day = new Date(yearState, monthState - 1, i);
    days.push(
      <div
        className={`day ${
          day <= date && day.toDateString() !== date.toDateString()
            ? "past"
            : ""
        }`}
      >
        <div
          className={`date ${
            day.toDateString() === date.toDateString() ? "today" : ""
          } `}
        >
          {i}
        </div>
      </div>
    );
  }

  const remainingDays = days.length <= 35 ? 35 - days.length : 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    const day = new Date(yearState, monthState, i);
    days.push(
      <div className={`day ${day <= date ? "past" : ""}`}>
        <div className="date other-month">{i}</div>
      </div>
    );
  }

  const handlePreviousMonth = () => {
    if (monthState === 1) {
      setMonthState(12);
      setYearState(yearState - 1);
    } else {
      setMonthState(monthState - 1);
    }
  };

  const handleNextMonth = () => {
    if (monthState === 12) {
      setMonthState(1);
      setYearState(yearState + 1);
    } else {
      setMonthState(monthState + 1);
    }
  };

  return (
    <>
      <div className="calendar-container">
        <div className="calendar">
          <div className="month">
            <span
              className="material-symbols-outlined"
              onClick={handlePreviousMonth}
            >
              arrow_back_ios_new
            </span>
            <div className="month-year">
              <span style={{ fontWeight: "bold", margin: "0", padding: "0" }}>
                {monthName}
              </span>
              <div>{yearState}</div>
            </div>

            <span
              className="material-symbols-outlined"
              onClick={handleNextMonth}
            >
              arrow_forward_ios
            </span>
          </div>
          <div className="days-container">
            <div className="days">{days}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendar;
