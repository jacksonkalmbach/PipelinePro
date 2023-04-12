import React from "react";
import LeadNote from "../../components/lead-components/lead-note/LeadNote";

import "./LeadNotes.styles.scss";

const LeadNotes = () => {
  return (
    <div className="lead-notes-container">
      <h1>Add new note</h1>
      <div className="new-note-container">
        <input className="note-title" placeholder="Note title" />
        <input className="note-body" placeholder="Add a note" />
        <button className="add-note-button">Add note</button>
      </div>
      <h1>Notes</h1>
      <LeadNote />
    </div>
  );
};

export default LeadNotes;
