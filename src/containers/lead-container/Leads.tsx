import React from "react";

import FilterAddLead from "../../components/lead-components/filter-add-leads/FilterAddLeads";
import CreateLead from "../../components/lead-components/create-lead/CreateLead";
import LeadList from "../../components/lead-components/lead-list/LeadList";

import "./Leads.styles.scss";

const Leads = () => {
  const leadCount = 567;

  return (
    <div className="leads-container">
      <div className="leads-count">{leadCount} Leads</div>
      <CreateLead />
      <FilterAddLead />
      <LeadList />
    </div>
  );
};

export default Leads;
