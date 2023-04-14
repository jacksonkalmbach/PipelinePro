import React from "react";

import "./LeadNote.styles.scss";

interface LeadNoteProps {
  noteTitle: string;
  noteBody: string;
  noteAuthor: string;
  noteCreatedAt: string;
}

const LeadNote = ({
  noteTitle,
  noteBody,
  noteAuthor,
  noteCreatedAt,
}: LeadNoteProps) => {
  return (
    <div className="lead-note-container">
      <div className="lead-note-header">
        <div className="note-author">
          <span className="material-symbols-outlined">description</span>
          Note by {noteAuthor}
        </div>
        <div className="note-create">
          <span className="material-symbols-outlined">calendar_today</span>
          Created {noteCreatedAt}
        </div>
      </div>
      <div className="note">
        <div className="lead-note-title">{noteTitle}</div>
        <div className="lead-note-body">{noteBody}</div>
      </div>
    </div>
  );
};

export default LeadNote;
