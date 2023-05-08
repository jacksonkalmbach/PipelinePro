import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import DayPreview from "../../components/calendar-components/day-preview/DayPreview";
import Day from "../../components/calendar-components/day/Day";

import "./Calendar.styles.scss";

const Calendar = () => {
  const showDayPreview = useSelector(
    (state: any) => state.calendar.showDayPreview
  );

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
  const thisWeek = [];

  useEffect(() => {
    setMonthState(month);
  }, [month]);

  for (let i = firstDayOfMonth; i > 0; i--) {
    const day = new Date(yearState, monthState - 1, -i + 1);
    days.push(<Day key={i * Math.random()} day={day} date={date} otherMonth />);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const day = new Date(yearState, monthState - 1, i);
    days.push(<Day key={i * Math.random()} day={day} date={date} />);
  }

  const remainingDays = days.length <= 35 ? 35 - days.length : 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    const day = new Date(yearState, monthState, i);
    days.push(<Day key={i * Math.random()} day={day} date={date} otherMonth />);
  }

  const today = new Date();
  const startOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay()
  );
  const endOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + (6 - today.getDay())
  );

  for (let i = startOfWeek.getDate(); i <= endOfWeek.getDate(); i++) {
    const day = new Date(yearState, monthState - 1, i);
    thisWeek.push(<Day key={i * Math.random()} day={day} date={date} />);
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
      {showDayPreview && <DayPreview />}
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
            <div className="day-name">
              <div className="name">Sun</div>
              <div className="letter">S</div>
              <div className="name">Mon</div>
              <div className="letter">M</div>
              <div className="name">Tue</div>
              <div className="letter">T</div>
              <div className="name">Wed</div>
              <div className="letter">W</div>
              <div className="name">Thu</div>
              <div className="letter">T</div>
              <div className="name">Fri</div>
              <div className="letter">F</div>
              <div className="name">Sat</div>
              <div className="letter">S</div>
            </div>
            <div className="days">{days}</div>
            <div className="this-week">{thisWeek}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendar;
