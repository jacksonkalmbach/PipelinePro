import React from "react";
import { useSelector } from "react-redux";

import FilterAddLead from "../../components/lead-components/filter-add-leads/FilterAddLeads";
import CreateLead from "../../components/lead-components/create-lead/CreateLead";
import LeadList from "../../components/lead-components/lead-list-components/lead-list/LeadList";

import "./Leads.styles.scss";
import LeadPreview from "../../components/lead-components/lead-preview/LeadPreview";

const Leads = () => {
  const leadCount = useSelector((state: any) => state.selectAllLeads.leadCount);

  return (
    <div className="leads-container">
      <div className="leads-count">{leadCount} Leads</div>
      <CreateLead />
      <LeadPreview />
      <FilterAddLead />
      <LeadList />
    </div>
  );
};

export default Leads;
