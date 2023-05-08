import React, { useState, useContext } from "react";
import { UserContext } from "../../../../context/UserContext";
import { useSelector } from "react-redux";

import "./NewNote.styles.scss";

interface NewNoteProps {
  leadId: number;
}

const defaultNewNote = {
  leadId: 0,
  noteTitle: "",
  noteBody: "",
  createdBy: 0,
  createdAt: new Date(),
};

const NewNote = ({ leadId }: NewNoteProps) => {
  const { ws } = useContext(UserContext);

  const noteAuthor = useSelector((state: any) => state.userAuth.uid);
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

  const handleAddNote = async () => {
    newNote["createdBy"] = noteAuthor;
    newNote["leadId"] = leadId;
    newNote["noteTitle"] = noteTitle;
    newNote["noteBody"] = noteBody;
    newNote["createdAt"] = new Date();

    try {
      const response = await fetch("http://localhost:5001/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNote),
      });
      if (response.ok) {
        ws.emit("new-note");
      }
      console.log("New note res", response);
    } catch (error) {
      console.error(error);
    }

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
