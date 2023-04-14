import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setShowLeadPreview } from "../../../store/reducers/leads/showLeadSlice";

import "./LeadPreview.styles.scss";

interface Lead {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company: string;
  job_title: string;
  lead_status: string;
}

const LeadPreview = () => {
  const dispatch = useDispatch();
  const [currentLead, setCurrentLead] = useState<Lead | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [status, setStatus] = useState("");

  const previewLead = useSelector((state: any) => state.showLead.previewLead);
  const leadId = useSelector((state: any) => state.showLead.previewId);

  useEffect(() => {
    try {
      fetch(`http://localhost:5001/leads/${leadId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
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

  console.log(firstName);

  const handleCloseLeadPreview = () => {
    dispatch(setShowLeadPreview(false));
  };

  return (
    previewLead && (
      <>
        <div className={previewLead ? "overlay" : ""}></div>
        <div className="lead-preview-container">
          <div className="lead-preview-buttons-container">
            <div
              className="back-to-leads-button"
              onClick={handleCloseLeadPreview}
            >
              <span className="material-symbols-outlined">first_page</span>
              Back to leads
            </div>
            <Link
              to={`/contacts/leads/${leadId}`}
              className="full-lead-details-button"
              onClick={handleCloseLeadPreview}
            >
              View full details
              <span className="material-symbols-outlined">arrow_right_alt</span>
            </Link>
          </div>
          <div className="lead-preview-header">
            <div className="lead-preview-name-container">
              <div className="lead-preview-name">
                {firstName !== "" ? firstName : <div>Loading...</div>}{" "}
                {lastName !== "" ? lastName : <div>Loading...</div>}
              </div>
              <div className="lead-preview-contact-info">
                <div className="lead-preview-email">
                  <span className="material-symbols-outlined">mail</span>
                  {email !== "" ? email : <div>Loading...</div>}
                </div>
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
              <div className="lead-owner-container">Lead Owner</div>
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
          <div className="lead-notes-and-activity">
            <div className="lead-activity-container">Upcoming Activity</div>
            <div className="lead-notes-container">Notes</div>
          </div>
        </div>
      </>
    )
  );
};

export default LeadPreview;
