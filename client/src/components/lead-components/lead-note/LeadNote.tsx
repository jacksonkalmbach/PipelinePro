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
        <div className="note-create">Created {noteCreatedAt}</div>
        <div className="note-author">{noteAuthor}</div>
      </div>
      <div className="note">
        <div className="lead-note-title">{noteTitle}</div>
        <div className="lead-note-body">{noteBody}</div>
      </div>
    </div>
  );
};

export default LeadNote;
