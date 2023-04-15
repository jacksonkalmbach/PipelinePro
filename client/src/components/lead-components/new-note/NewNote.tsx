import React, { useState } from "react";

import "./NewNote.styles.scss";

const defaultNewNote = {
  noteTitle: "",
  noteBody: "",
};

const NewNote = () => {
  const [newNote, setNewNote] = useState(defaultNewNote);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");

  const handleNoteTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoteTitle(e.target.value);
  };

  const handleNoteBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteBody(e.target.value);
  };

  const resetNote = () => {
    setNewNote(defaultNewNote);
    setNoteTitle("");
    setNoteBody("");
  };

  const handleAddNote = () => {
    newNote["noteTitle"] = noteTitle;
    newNote["noteBody"] = noteBody;
    console.log(newNote);
    resetNote();
  };

  return (
    <div className="new-note-container">
      <input
        className="note-title"
        onChange={handleNoteTitle}
        value={noteTitle}
        placeholder="Note title"
      />
      <textarea
        className="note-body"
        onChange={handleNoteBody}
        value={noteBody}
        placeholder="Note body"
      />
      <div className="new-note-buttons-container">
        <button onClick={resetNote} className="cancel-button">
          Clear
        </button>
        <button onClick={handleAddNote} className="add-note-button">
          Add note
        </button>
      </div>
    </div>
  );
};

export default NewNote;
