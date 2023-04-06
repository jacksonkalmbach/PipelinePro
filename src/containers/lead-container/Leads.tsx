import React from "react";

import FilterAddLead from "../../components/filter-add-leads/FilterAddLeads";
import CreateLead from "../../components/create-lead/CreateLead";
import LeadList from "../../components/lead-list/LeadList";

import "./Leads.styles.scss";

const Leads = () => {
  const leadCount = 567;

  return (
    <div className="leads-container">
      <CreateLead />
      <div className="leads-count">{leadCount} Leads</div>
      <FilterAddLead />
      <LeadList />
    </div>
  );
};

export default Leads;
