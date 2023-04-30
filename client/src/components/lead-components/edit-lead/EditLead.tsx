import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { showEditLead } from "../../../store/reducers/leads/showLeadSlice";

import LeadRowStatus from "../lead-list-components/lead-row-status/LeadRowStatus";

import "./EditLead.styles.scss";

interface EditLeadProps {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  leadOwner: number;
  leadOwnerFirstName: string;
  leadOwnerLastName: string;
  leadOwnerPhotoURL: string;
  leadStatus: string;
}

const EditLead = ({
  id,
  firstName,
  lastName,
  email,
  phone,
  company,
  jobTitle,
  leadOwner,
  leadOwnerFirstName,
  leadOwnerLastName,
  leadOwnerPhotoURL,
  leadStatus,
}: EditLeadProps) => {
  const dispatch = useDispatch();

  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [editStatus, setEditStatus] = useState(leadStatus);

  const [formFields, setFormFields] = useState({
    firstName,
    lastName,
    email,
    phone,
    company,
    jobTitle,
    leadOwner,
    leadStatus,
  });

  const handleCloseEdit = () => {
    dispatch(showEditLead(false));
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleLeadStatusChange = (status: string): void => {
    setEditStatus(status);
    setFormFields((prevFormFields) => ({
      ...prevFormFields,
      leadStatus: status,
    }));
  };

  const handleUpdateLead = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      fetch(`http://localhost:5001/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formFields),
      });
      setUpdateSuccess(true);
    } catch (error) {
      console.log("error updating lead", error);
    }
  };

  return (
    <div className="edit-lead-container">
      {updateSuccess ? (
        <>
          <div className="close-edit-lead" onClick={handleCloseEdit}>
            <span className="material-symbols-outlined">close</span>
          </div>
          <div className="success-icon">
            <span className="material-symbols-outlined">done</span>Lead Updated!
          </div>
        </>
      ) : (
        <>
          <div className="close-edit-lead" onClick={handleCloseEdit}>
            Close<span className="material-symbols-outlined">close</span>
          </div>
          <div className="edit-lead-content">
            <h1>Edit Lead</h1>
            <form className="edit-lead-form" onSubmit={handleUpdateLead}>
              <div className="lead-name">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    className="first-name-input"
                    required
                    type="text"
                    id="firstName-input"
                    name="firstName"
                    placeholder={firstName}
                    value={formFields.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    className="last-name-input"
                    required
                    type="text"
                    id="lastName-input"
                    name="lastName"
                    placeholder={lastName}
                    value={formFields.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  id="email-input"
                  name="email"
                  placeholder={email}
                  value={formFields.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  id="phone-input"
                  name="phone"
                  maxLength={10}
                  placeholder={phone}
                  value={formFields.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Company</label>
                <input
                  type="text"
                  id="company-input"
                  name="company"
                  placeholder={company}
                  value={formFields.company}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Job Title</label>
                <input
                  type="text"
                  id="jobTitle-input"
                  name="jobTitle"
                  placeholder={jobTitle}
                  value={formFields.jobTitle}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Lead Owner</label>
                <input
                  type="text"
                  id="leadOwner-input"
                  name="leadOwner"
                  placeholder={`${leadOwnerFirstName} ${leadOwnerLastName}`}
                />
              </div>
              <div>
                Lead Status
                <div className="lead-progress">
                  <LeadRowStatus
                    status="New"
                    clickable={true}
                    onClick={() => handleLeadStatusChange("New")}
                    selected={editStatus === "New" ? true : false}
                  />
                  <LeadRowStatus
                    status="Open"
                    clickable={true}
                    onClick={() => handleLeadStatusChange("Open")}
                    selected={editStatus === "Open" ? true : false}
                  />
                  <LeadRowStatus
                    status="In Progress"
                    clickable={true}
                    onClick={() => handleLeadStatusChange("In Progress")}
                    selected={editStatus === "In Progress" ? true : false}
                  />
                  <LeadRowStatus
                    status="Warm"
                    clickable={true}
                    onClick={() => handleLeadStatusChange("Warm")}
                    selected={editStatus === "Warm" ? true : false}
                  />
                  <LeadRowStatus
                    status="Closed"
                    clickable={true}
                    onClick={() => handleLeadStatusChange("Closed")}
                    selected={editStatus === "Closed" ? true : false}
                  />
                </div>
              </div>
              <button className="update-lead-button" type="submit">
                Update Lead
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default EditLead;
