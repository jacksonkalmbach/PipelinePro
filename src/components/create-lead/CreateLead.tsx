import React, { useEffect, useState } from "react";

import "./CreateLead.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { setShowCreateLead } from "../../store/reducers/leads/showCreateLeadSlice";

const CreateLead = () => {
  const dispatch = useDispatch();

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
            <input
              type="text"
              id="first-name-input"
              name="first-name"
              placeholder="First Name"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="last-name-input"
              name="last-name"
              placeholder="Last Name"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              id="email-input"
              name="email"
              placeholder="Email Address"
            />
          </div>
          <div className="form-group">
            <input
              type="tel"
              id="phone-input"
              name="phone"
              placeholder="Phone Number"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="company-input"
              name="company"
              placeholder="Company"
            />
          </div>
          <div className="create-lead-button-container">
            <button className="create-lead-button" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateLead;
