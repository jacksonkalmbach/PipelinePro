import React from "react";

import "./FilterAddLeads.styles.scss";

const FilterAddLead = () => {
  const handleCreateLead = () => {
    console.log("Create Lead");
  };

  return (
    <div className="filter-add-lead-container">
      <div className="filter-leads-container">
        <div className="filter-leads">
          <span className="material-symbols-outlined">expand_more</span>All
          leads
        </div>
        <div className="filter-leads">
          <span className="material-symbols-outlined">expand_more</span>Create
          date
        </div>
        <div className="filter-leads">
          <span className="material-symbols-outlined">expand_more</span>Contact
          Owner
        </div>
        <div className="filter-leads">
          <span className="material-symbols-outlined">expand_more</span>More
          filters
        </div>
      </div>
      <button className="create-lead-button" onClick={handleCreateLead}>
        Create Lead
      </button>
    </div>
  );
};

export default FilterAddLead;
