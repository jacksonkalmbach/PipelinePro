import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LeadActivity from "../lead-activity-container/LeadActivity";
import LeadNotes from "../../components/lead-components/lead-notes-component/LeadNotes";

import "./LeadDetails.styles.scss";

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

const LeadDetails = () => {
  const [selectedSection, setSelectedSection] = useState("notes");
  const [currentLead, setCurrentLead] = useState<Lead | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [status, setStatus] = useState("");
  const currentLeadId = useSelector((state: any) => state.showLead.previewId);

  const handleToggleSection = (section: string) => {
    setSelectedSection(section);
  };

  useEffect(() => {
    try {
      fetch(`http://localhost:5001/leads/${currentLeadId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setCurrentLead(data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [currentLeadId]);

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

  return (
    <div className="lead-details-container">
      <div className="lead-info-container">
        <Link to="contacts/leads" className="back-to-leads-button">
          <span className="material-symbols-outlined">first_page</span>
          Back to leads
        </Link>
        <div className="lead-full-name">
          <h1>
            {firstName} {lastName}
          </h1>
        </div>
        <div>{company}</div>
      </div>
      <div className="lead-notes-activity-container">
        <input placeholder="Search notes and activity" />
        <div className="toggle-notes-activity">
          <h1
            className={selectedSection === "notes" ? "selected" : ""}
            onClick={() => handleToggleSection("notes")}
          >
            Notes
          </h1>
          <h1
            className={selectedSection === "activity" ? "selected" : ""}
            onClick={() => handleToggleSection("activity")}
          >
            Activity
          </h1>
        </div>
        {selectedSection === "notes" ? <LeadNotes /> : <LeadActivity />}
      </div>
    </div>
  );
};

export default LeadDetails;
