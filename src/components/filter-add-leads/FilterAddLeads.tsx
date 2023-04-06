import React from "react";
import { useDispatch } from "react-redux";
import { setShowCreateLead } from "../../store/reducers/leads/showCreateLeadSlice";

import "./FilterAddLeads.styles.scss";

const FilterAddLead = () => {
  const dispatch = useDispatch();

  const handleCreateLead = () => {
    dispatch(setShowCreateLead());
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
