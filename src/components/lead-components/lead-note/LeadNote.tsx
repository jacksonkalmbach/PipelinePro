import React from "react";

import "./LeadNote.styles.scss";

const LeadNote = () => {
  return (
    <div className="lead-note-container">
      <div className="lead-note-header">
        <div className="note-create">Created at</div>
        <div className="note-author">AUTHOR</div>
      </div>
      LeadNoteBody
    </div>
  );
};

export default LeadNote;
