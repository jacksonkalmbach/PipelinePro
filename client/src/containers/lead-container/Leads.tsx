import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import FilterAddLead from "../../components/lead-components/filter-add-leads/FilterAddLeads";
import CreateLead from "../../components/lead-components/create-lead/CreateLead";
import LeadList from "../../components/lead-components/lead-list-components/lead-list/LeadList";

import "./Leads.styles.scss";
import LeadPreview from "../../components/lead-components/lead-preview/LeadPreview";

const Leads = () => {
  const dispatch = useDispatch();

  const [leads, setLeads] = useState([]);
  const [leadCount, setLeadCount] = useState<number | null>(0);

  useEffect(() => {
    fetch("http://localhost:5001/leads")
      .then((res) => res.json())
      .then((data) => {
        setLeads(data);
      });
  }, [dispatch]);

  useEffect(() => {
    if (leads) {
      setLeadCount(leads.length);
    }
  }, [leads]);

  return (
    <div className="leads-container">
      <div className="leads-count">{leadCount} Leads</div>
      <CreateLead />
      <LeadPreview />
      <FilterAddLead />
      <LeadList leads={leads} leadCount={leadCount} />
    </div>
  );
};

export default Leads;
