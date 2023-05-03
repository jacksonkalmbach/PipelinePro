import React from "react";

import "./NewEvent.styles.scss";

const NewEvent = () => {
  const addNewEvent = () => {
    console.log("Add new event");
  };

  return (
    <div className="new-event-container">
      <div className="new-event-content">
        <div className="new-event-title">
          <input type="text" placeholder="Title" />
        </div>
        <div className="new-event-date">
          <input type="date" />
        </div>
        <div className="new-event-time">
          <input type="time" />
        </div>
      </div>
      <div className="new-event-description">
        <textarea placeholder="Description" />
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
