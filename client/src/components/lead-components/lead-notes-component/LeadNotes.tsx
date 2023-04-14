import React from "react";
import LeadNote from "../lead-note/LeadNote";

import "./LeadNotes.styles.scss";

const LeadNotes = () => {
  return (
    <div className="lead-notes-container">
      <h1>Add new note</h1>
      <div className="new-note-container">
        <input className="note-title" placeholder="Note title" />
        <textarea className="note-body" placeholder="Add a note" />
        <button className="add-note-button">Add note</button>
      </div>
      <h1>Notes</h1>
      <LeadNote
        noteTitle="Test Title"
        noteBody="this is the body"
        noteAuthor="Jackson Kalmbach"
        noteCreatedAt="1/2/23"
      />
    </div>
  );
};

export default LeadNotes;
