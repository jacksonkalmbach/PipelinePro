import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EmployeeSelect from "../../employee-components/employee-select/EmployeeSelect";

import "./NewEvent.styles.scss";

const defaultEventData = {
  eventName: "",
  eventDate: "",
  eventTime: "",
  eventDescription: "",
  eventOwner: "",
};

interface EventOwnerData {
  id: string;
  first_name: string;
  last_name: string;
  photo_url: string;
}

const defaultEventOwner = {
  id: "",
  first_name: "",
  last_name: "",
  photo_url: "",
};

const NewEvent = () => {
  const currentUser = useSelector((state: any) => state.userAuth.uid);
  const previewDate = useSelector((state: any) => state.calendar.datePreview);
  const [eventOwner, setEventOwner] =
    useState<EventOwnerData>(defaultEventOwner);
  const [newEventData, setNewEventData] = useState(defaultEventData);

  const date = new Date(previewDate);
  const formattedDate = date.toLocaleString("default", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const isoDate = date.toISOString();
  const yearMonthDay = isoDate.slice(0, 10);

  const onChangeHandler = (e: any) => {
    setNewEventData({
      ...newEventData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    fetch(`http://localhost:5001/users/${currentUser}`)
      .then((res) => res.json())
      .then((data) => {
        setEventOwner(data);
      });
  }, [currentUser]);

  const addNewEvent = () => {
    console.log("new event data", newEventData);
    try {
      fetch("http://localhost:5001/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newEventData,
          eventOwner: eventOwner.id,
          eventDate: yearMonthDay,
        }),
      });
    } catch (error) {
      console.log("error adding new event", error);
    }
  };

  return (
    <div className="new-event-container">
      <div className="new-event-header">
        <div className="new-event-title">
          <input
            type="text"
            name="eventName"
            value={newEventData.eventName}
            placeholder="Add Event Name"
            onChange={onChangeHandler}
          />
        </div>
        <div className="new-event-date-time">
          <div className="new-event-date">{formattedDate}</div>
          <div className="vertical-line"></div>
          <div className="new-event-time">
            <input type="time" name="eventTime" onChange={onChangeHandler} />
          </div>
          <div className="vertical-line"></div>
          <div>
            <EmployeeSelect
              id={eventOwner.id}
              firstName={eventOwner.first_name}
              lastName={eventOwner.last_name}
              profilePic={eventOwner.photo_url}
            />
          </div>
        </div>
      </div>
      <div className="new-event-description">
        <textarea
          placeholder="Description"
          name="eventDescription"
          value={newEventData.eventDescription}
          onChange={onChangeHandler}
        />
      </div>

      <div className="new-event-button-container">
        <button className="add-new-event-button" onClick={addNewEvent}>
          Add New Event
        </button>
      </div>
    </div>
  );
};

export default NewEvent;
