import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Event from "../event/CalendarEvent";

import {
  setShowDayPreview,
  setDatePreview,
  setYearMonthDay,
} from "../../../store/reducers/calendar/calendarSlice";

import "./Day.styles.scss";

interface DayProps {
  day: Date;
  date: Date;
  past?: boolean;
  otherMonth?: boolean;
}

interface EventData {
  event_id: number;
  event_name: string | undefined;
  event_date: string;
  event_time: string;
  event_description: string;
  event_owner: number;
}

const defaultEventData = {
  event_id: 0,
  event_name: "",
  event_date: "",
  event_time: "",
  event_description: "",
  event_owner: 0,
};

const Day = ({ day, date, past, otherMonth }: DayProps) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state.userAuth.uid);

  const [eventData, setEventData] = useState<EventData[]>([defaultEventData]);
  const [eventName, setEventName] = useState<string>("");

  const isoDate = day.toISOString();
  const yearMonthDay = isoDate.slice(0, 10);

  const handleShowDayPreview = () => {
    dispatch(setShowDayPreview(true));
    dispatch(setDatePreview(isoDate));
    dispatch(setYearMonthDay(yearMonthDay));
  };

  useEffect(() => {
    try {
      fetch(`http://localhost:5001/events/${yearMonthDay}/${currentUser}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            setEventName(data[0].event_name);
          }
          setEventData(data);
        });
    } catch (error) {
      console.log("error fetching events in Day Component", error);
    }
  }, [yearMonthDay, currentUser]);

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
      <div className="events">
        {eventData &&
          eventName[0] &&
          eventData.map((event) => {
            return <Event eventName={event.event_name} />;
          })}
      </div>
    </div>
  );
};

export default Day;
