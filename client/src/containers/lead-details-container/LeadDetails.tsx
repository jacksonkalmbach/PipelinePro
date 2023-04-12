import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LeadActivity from "../lead-activity-container/LeadActivity";
import LeadNotes from "../lead-notes-container/LeadNotes";

import "./LeadDetails.styles.scss";

const LeadDetails = () => {
  const [selectedSection, setSelectedSection] = useState("notes");
  const currentLeadId = useSelector((state: any) => state.showLead.previewId);

  const handleToggleSection = (section: string) => {
    setSelectedSection(section);
  };

  return (
    <div className="lead-details-container">
      <div className="lead-info-container">
        <Link to="contacts/leads" className="back-to-leads-button">
          <span className="material-symbols-outlined">first_page</span>
          Back to leads
        </Link>
        <div className="lead-full-name">
          <h1>{currentLeadId} FirstName</h1>
          <h1>{currentLeadId} LastName</h1>
        </div>
        <div>CompanyName</div>
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
