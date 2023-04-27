import socket from "../../../utils/socket";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setDeleteType,
  setShowLeadPreview,
  showConfirmDelete,
  showEditLead,
} from "../../../store/reducers/leads/showLeadSlice";

import "./LeadPreview.styles.scss";
import LeadNote from "../lead-notes-components/lead-note/LeadNote";
import NewNote from "../lead-notes-components/new-note/NewNote";
import EmployeeSelect from "../../employee-components/employee-select/EmployeeSelect";
import ConfirmDelete from "../confirm-delete/ConfirmDelete";
import EditLead from "../edit-lead/EditLead";

interface Lead {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company: string;
  job_title: string;
  lead_status: string;
  lead_owner: number;
}

const currentLeadDetails = {
  id: 0,
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  company: "",
  job_title: "",
  lead_status: "",
  lead_owner: 0,
};

const LeadPreview = () => {
  const dispatch = useDispatch();

  const [currentLead, setCurrentLead] = useState<Lead>(currentLeadDetails);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [status, setStatus] = useState("");

  const [optionsOpen, setOptionsOpen] = useState(false);

  const [ownerId, setOwnerId] = useState(0);
  const [ownerFirstName, setOwnerFirstName] = useState("");
  const [ownerLastName, setOwnerLastName] = useState("");
  const [ownerPhotoURL, setOwnerPhotoURL] = useState("");

  const [notes, setNotes] = useState([]);
  const [addNote, setAddNote] = useState(false);

  const confirmDelete = useSelector(
    (state: any) => state.showLead.confirmDelete
  );
  const previewLead = useSelector((state: any) => state.showLead.previewLead);
  const leadId = useSelector((state: any) => state.showLead.previewId);
  const editLead = useSelector((state: any) => state.showLead.editLead);

  useEffect(() => {
    try {
      fetch(`http://localhost:5001/leads/${leadId}`)
        .then((res) => res.json())
        .then((data) => {
          setCurrentLead(data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [leadId]);

  useEffect(() => {
    if (currentLead) {
      setFirstName(currentLead.first_name);
      setLastName(currentLead.last_name);
      setEmail(currentLead.email);
      setPhone(currentLead.phone);
      setCompany(currentLead.company);
      setJobTitle(currentLead.job_title);
      setStatus(currentLead.lead_status);
    }
  }, [currentLead]);

  useEffect(() => {
    if (currentLead) {
      try {
        fetch(`http://localhost:5001/notes/${leadId}`)
          .then((res) => res.json())
          .then((data) => {
            setNotes(data);
          });
      } catch (error) {
        console.log("error fetching lead notes", error);
      }
    }
  }, [currentLead, addNote, leadId]);

  useEffect(() => {
    if (currentLead) {
      try {
        fetch(`http://localhost:5001/employees/${currentLead.lead_owner}`)
          .then((res) => res.json())
          .then((data) => {
            setOwnerId(data.employee_id);
            setOwnerFirstName(data.first_name);
            setOwnerLastName(data.last_name);
            setOwnerPhotoURL(data.profile_pic);
          });
      } catch (error) {
        console.log("error fetching lead owner", error);
      }
    }
  }, [currentLead]);

  const handleCloseLeadPreview = () => {
    dispatch(setShowLeadPreview(false));
    dispatch(showConfirmDelete(false));
    setOptionsOpen(false);
  };

  const handleAddNote = () => {
    setAddNote(!addNote);
  };

  const handleOpenOptions = () => {
    setOptionsOpen(!optionsOpen);
  };

  const handleEditLead = () => {
    dispatch(showEditLead(true));
  };

  const handleDeleteLead = () => {
    dispatch(setDeleteType("lead"));
    dispatch(showConfirmDelete(true));
  };

  return (
    previewLead && (
      <>
        {editLead && (
          <EditLead
            id={leadId}
            firstName={firstName}
            lastName={lastName}
            email={email}
            phone={phone}
            company={company}
            jobTitle={jobTitle}
            leadOwner={ownerId}
            leadOwnerFirstName={ownerFirstName}
            leadOwnerLastName={ownerLastName}
            leadOwnerPhotoURL={ownerPhotoURL}
            leadStatus={status}
          />
        )}
        {confirmDelete && <ConfirmDelete selectedId={leadId} />}
        <div className={previewLead ? "overlay" : ""}></div>
        <div className="lead-preview-container">
          <div className="lead-preview-buttons-container">
            <h1>Lead Preview</h1>
            <div
              className="close-lead-details-button"
              onClick={handleCloseLeadPreview}
            >
              Close<span className="material-symbols-outlined">close</span>
            </div>
          </div>
          <div className="lead-preview-header">
            <div className="lead-preview-name-container">
              <div className="lead-name-and-options">
                <div className="lead-preview-name">
                  {firstName !== "" ? firstName : <div>Loading...</div>}{" "}
                  {lastName !== "" ? lastName : <div>Loading...</div>}
                </div>
                <div className="edit-options">
                  <div className="lead-edit" onClick={handleOpenOptions}>
                    <span className="material-symbols-outlined">
                      more_horiz
                    </span>
                  </div>
                  {optionsOpen && (
                    <div className="lead-options">
                      <div className="lead-option" onClick={handleEditLead}>
                        <span className="material-symbols-outlined">edit</span>
                        Edit Lead
                      </div>
                      <div
                        className="lead-option delete"
                        onClick={handleDeleteLead}
                      >
                        <span className="material-symbols-outlined">
                          delete
                        </span>
                        Delete Lead
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="lead-preview-contact-info">
                <div className="lead-preview-email">
                  <span className="material-symbols-outlined">mail</span>
                  {email !== "" ? email : <div>Loading...</div>}
                </div>
                <div>&#x2022;</div>
                <div className="lead-preview-phone">
                  <span className="material-symbols-outlined">call</span>
                  {phone !== "" ? (
                    "(" +
                    phone.slice(0, 3) +
                    ") " +
                    phone.slice(3, 6) +
                    "-" +
                    phone.slice(6, 10)
                  ) : (
                    <div>Loading...</div>
                  )}
                </div>
              </div>
            </div>
            <div className="additional-lead-details">
              <div className="lead-owner-container">
                Lead Owner
                <div className="detail">
                  {ownerId !== 0 ? (
                    <EmployeeSelect
                      id={ownerId}
                      firstName={ownerFirstName}
                      lastName={ownerLastName}
                      profilePic={ownerPhotoURL}
                    />
                  ) : (
                    "Loading..."
                  )}
                </div>
              </div>
              <div className="lead-company-container">
                Company
                <div className="detail">
                  {company !== "" ? company : "Loading..."}
                </div>
              </div>
              <div className="lead-job-title-container">
                Job Title
                <div className="detail">
                  {jobTitle !== "" ? jobTitle : "Loading..."}
                </div>
              </div>
            </div>
          </div>
          <div className="lead-status-container">
            <div
              className={`lead-status ${status === "New" ? "selected" : ""}`}
            >
              New
            </div>
            <div
              className={`lead-status ${status === "Open" ? "selected" : ""}`}
            >
              Open
            </div>
            <div
              className={`lead-status ${
                status === "In Progress" ? "selected" : ""
              }`}
            >
              In Progress
            </div>
            <div
              className={`lead-status ${status === "Warm" ? "selected" : ""}`}
            >
              Warm
            </div>
            <div
              className={`lead-status ${status === "Closed" ? "selected" : ""}`}
            >
              Closed
            </div>
          </div>
          <div className="lead-notes-feed">
            <div className="lead-notes-container">
              <div className="note-title-and-add-button">
                <h4>Notes</h4>
                <div className="add-note-button" onClick={handleAddNote}>
                  {!addNote ? (
                    <div className="add-note-button">
                      <span className="material-symbols-outlined">add</span>Add
                      note
                    </div>
                  ) : (
                    <div className="close">
                      <span className="material-symbols-outlined">close</span>
                      Close
                    </div>
                  )}
                </div>
              </div>
              {addNote && <NewNote leadId={leadId} />}
              {notes.length > 0 &&
                notes.map((note: any) => {
                  const {
                    note_id,
                    note_title,
                    note_body,
                    created_at,
                    created_by,
                  } = note;
                  return (
                    <LeadNote
                      key={note_id}
                      noteId={note_id}
                      noteTitle={note_title}
                      noteBody={note_body}
                      noteCreatedAt={created_at}
                      noteAuthor={created_by}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default LeadPreview;
