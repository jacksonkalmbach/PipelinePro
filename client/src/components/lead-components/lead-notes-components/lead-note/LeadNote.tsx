import React, { useEffect, useState } from "react";
import EmployeeSelect from "../../../employee-components/employee-select/EmployeeSelect";

import "./LeadNote.styles.scss";

interface LeadNoteProps {
  noteTitle: string;
  noteBody: string;
  noteAuthor: string;
  noteCreatedAt: string;
}

interface AuthorDetails {
  id: string;
  first_name: string;
  last_name: string;
  profile_pic: string;
}

const defaultAuthorDetails = {
  id: "",
  first_name: "",
  last_name: "",
  profile_pic: "",
};

const LeadNote = ({
  noteTitle,
  noteBody,
  noteAuthor,
  noteCreatedAt,
}: LeadNoteProps) => {
  const isoDate = new Date(noteCreatedAt);
  const date = isoDate.toLocaleDateString();

  const [authorDetails, setAuthorDetails] =
    useState<AuthorDetails>(defaultAuthorDetails);

  useEffect(() => {
    const getAuthorDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/employees/${noteAuthor}`
        );
        const employeeDetails = await response.json();
        console.log(employeeDetails);
        setAuthorDetails(employeeDetails);
      } catch (error) {
        console.log(error);
      }
    };
    getAuthorDetails();
  }, [noteAuthor]);

  return (
    <div className="lead-note-container">
      <div className="lead-note-header">
        <div className="note-author">
          <span className="material-symbols-outlined">description</span>
          {Object.values(authorDetails).length > 0 && (
            <EmployeeSelect
              id={Number(noteAuthor)}
              firstName={authorDetails.first_name}
              lastName={authorDetails.last_name}
              profilePic={authorDetails.profile_pic}
            />
          )}
        </div>
        <div className="note-create">
          <span className="material-symbols-outlined">calendar_today</span>
          Created {date}
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
