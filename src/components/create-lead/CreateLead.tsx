import React, { useState } from "react";

import "./CreateLead.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { setShowCreateLead } from "../../store/reducers/leads/showCreateLeadSlice";
import Dropdown from "../dropdown/Dropdown";
import LeadRowStatus from "../lead-row-status/LeadRowStatus";

const CreateLead = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [leadOwner, setleadOwner] = useState<string>("");

  const showCreateLead = useSelector(
    (state: any) => state.showCreateLead.value
  );

  const handleCloseCreateLead = () => {
    dispatch(setShowCreateLead());
  };

  return (
    <>
      <div className={showCreateLead ? "overlay" : ""}></div>
      <div
        className={`create-lead-container ${showCreateLead ? "" : "slide-out"}`}
      >
        <div className="create-lead-header">
          <h1>Create Lead</h1>
          <div
            className="close-create-lead-button"
            onClick={handleCloseCreateLead}
          >
            <span className="material-symbols-outlined">close</span>
          </div>
        </div>
        <form className="create-lead-form">
          <div className="form-group">
            Full Name
            <input
              type="text"
              id="first-name-input"
              name="first-name"
              placeholder="e.g. John Doe"
            />
          </div>
          <div className="form-group">
            Email
            <input
              type="email"
              id="email-input"
              name="email"
              placeholder="e.g. mail@example.com"
            />
          </div>
          <div className="form-group">
            Phone
            <input
              type="tel"
              id="phone-input"
              name="phone"
              placeholder="Enter Number"
            />
          </div>
          <div className="form-group">
            Company
            <input
              type="text"
              id="company-input"
              name="company"
              placeholder="e.g. Google"
            />
          </div>
          <div className="form-group">
            Job Title
            <input
              type="text"
              id="company-input"
              name="company"
              placeholder="e.g. Project Manager"
            />
          </div>
          <div>
            Lead Status
            <div className="lead-progress">
              <LeadRowStatus status="New" clickable={true} />
              <LeadRowStatus status="Open" clickable={true} />
              <LeadRowStatus status="Closed" clickable={true} />
              <LeadRowStatus status="Warm" clickable={true} />
            </div>
          </div>
          <div className="create-lead-button-container">
            <button className="create-lead-and-another-button">
              Create and Add another
            </button>
            <button className="create-lead-button">Create</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateLead;
