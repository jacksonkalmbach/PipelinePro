import React from "react";
import { useDispatch } from "react-redux";
import { setShowCreateLead } from "../../../store/reducers/leads/showLeadSlice";
import Dropdown from "../../dropdown/Dropdown";

import "./FilterAddLeads.styles.scss";

const FilterAddLead = () => {
  const dispatch = useDispatch();

  const handleCreateLead = () => {
    dispatch(setShowCreateLead());
  };

  const dropdownOptionsAllLeads = ["Sort A - Z", "Sort Z - A"];
  const dropdownOptionsCreateDate = ["Sort New - Old", "Sort Old - New"];
  const dropdownOptionsContactOwner = ["Name 1", "Name 2", "Name 3"];
  const dropdownOptionsMoreFilters = ["Filter 1", "Filter 2", "Filter 3"];

  return (
    <div className="filter-add-lead-container">
      <div className="filter-leads-container">
        <Dropdown title="All leads" options={dropdownOptionsAllLeads} />
        <Dropdown title="Create Date" options={dropdownOptionsCreateDate} />
        <Dropdown title="Contact Owner" options={dropdownOptionsContactOwner} />
        <Dropdown
          title="More filters"
          options={dropdownOptionsMoreFilters}
          moreFilters={true}
        />
      </div>
      <button className="create-lead-button" onClick={handleCreateLead}>
        Create Lead
      </button>
    </div>
  );
};

export default FilterAddLead;
