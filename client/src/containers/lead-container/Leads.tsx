import socket from "../../utils/socket";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import FilterAddLead from "../../components/lead-components/filter-add-leads/FilterAddLeads";
import CreateLead from "../../components/lead-components/create-lead/CreateLead";
import LeadList from "../../components/lead-components/lead-list-components/lead-list/LeadList";

import "./Leads.styles.scss";
import LeadPreview from "../../components/lead-components/lead-preview/LeadPreview";

interface LeadData {
  lead_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  leadOwner: number;
  lead_status: string;
}

const Leads = () => {
  const dispatch = useDispatch();

  const [leads, setLeads] = useState<LeadData[]>([]);
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

  useEffect(() => {
    socket.on("new-lead", (lead) => {
      setLeads((leads) => [...leads, lead]);
    });
  }, [leads]);

  return (
    <div className="leads-container">
      <div className="leads-count">{leadCount} Leads</div>
      <CreateLead />
      <LeadPreview />
      <div className="filters-and-add-lead">
        <FilterAddLead />
      </div>
      <div className="all-leads-list">
        <LeadList
          leads={leads}
          leadCount={leadCount}
          searchPlaceholder="Search all leads"
        />
      </div>
    </div>
  );
};

export default Leads;
