import React, { useState, useEffect } from "react";

import "./CreateLead.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { setShowCreateLead } from "../../store/reducers/leads/showCreateLeadSlice";
import LeadRowStatus from "../lead-row-status/LeadRowStatus";

const defaultCreateLeadState = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  jobTitle: "",
  leadStatus: "",
};

const CreateLead = () => {
  const dispatch = useDispatch();
  const [initalRender, setInitialRender] = useState<boolean>(true);

  const [formFields, setFormFields] = useState(defaultCreateLeadState);
  const { fullName, email, phone, company, jobTitle, leadStatus } = formFields;

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleLeadStatusChange = (status: string): void => {
    setFormFields({ ...formFields, leadStatus: status });
  };

  const showCreateLead = useSelector(
    (state: any) => state.showCreateLead.value
  );

  useEffect(() => {
    setInitialRender(false);
  }, []);

  const handleCloseCreateLead = () => {
    dispatch(setShowCreateLead());
  };

  return (
    <>
      <div className={showCreateLead ? "overlay" : ""}></div>
      <div
        className={`create-lead-container ${
          initalRender ? "hidden" : showCreateLead ? "" : "slide-out"
        }`}
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
              required
              type="text"
              id="full-name-input"
              name="fullName"
              placeholder="e.g. John Doe"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            Email
            <input
              type="email"
              id="email-input"
              name="email"
              placeholder="e.g. mail@example.com"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            Phone
            <input
              type="tel"
              id="phone-input"
              name="phone"
              placeholder="Enter Number"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            Company
            <input
              type="text"
              id="company-input"
              name="company"
              placeholder="e.g. Google"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            Job Title
            <input
              type="text"
              id="job-title-input"
              name="jobTitle"
              placeholder="e.g. Project Manager"
              onChange={handleInputChange}
            />
          </div>
          <div>
            Lead Status
            <div className="lead-progress">
              <LeadRowStatus
                status="New"
                clickable={true}
                onClick={() => handleLeadStatusChange("New")}
                selected={leadStatus === "New" ? true : false}
              />
              <LeadRowStatus
                status="Open"
                clickable={true}
                onClick={() => handleLeadStatusChange("Open")}
                selected={leadStatus === "Open" ? true : false}
              />
              <LeadRowStatus
                status="Closed"
                clickable={true}
                onClick={() => handleLeadStatusChange("Closed")}
                selected={leadStatus === "Closed" ? true : false}
              />
              <LeadRowStatus
                status="Warm"
                clickable={true}
                onClick={() => handleLeadStatusChange("Warm")}
                selected={leadStatus === "Warm" ? true : false}
              />
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
