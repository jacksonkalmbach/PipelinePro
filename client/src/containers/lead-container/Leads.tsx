import socket from "../../utils/socket";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import FilterAddLead from "../../components/lead-components/filter-add-leads/FilterAddLeads";
import CreateLead from "../../components/lead-components/create-lead/CreateLead";
import LeadList from "../../components/lead-components/lead-list-components/lead-list/LeadList";

import "./Leads.styles.scss";
import LeadPreview from "../../components/lead-components/lead-preview/LeadPreview";
import ContactConvert from "../../components/contact-convert/ContactConvert";

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
  const [leads, setLeads] = useState<LeadData[]>([]);
  const [leadCount, setLeadCount] = useState<number | null>(0);
  const leadSelected = useSelector(
    (state: any) => state.selectAllLeads.selectedLeads
  );

  useEffect(() => {
    fetch("http://localhost:5001/leads")
      .then((res) => res.json())
      .then((data) => {
        setLeads(data);
        setLeadCount(data.length);
      });
  }, []);

  useEffect(() => {
    socket.on("new-lead", (lead) => {
      console.log("NEW LEAD - Leads component", lead);
      setLeads((leads) => [...leads, lead]);
      setLeadCount((leadCount) => (leadCount ? leadCount + 1 : 1));
    });
  }, []);

  return (
    <div className="leads-container">
      <div className="count-and-create">
        <div className="leads-count">{leadCount} Leads</div>
        <CreateLead />
        <LeadPreview />
        <div className="filters-and-add-lead">
          <FilterAddLead />
        </div>
      </div>
      {leadSelected.length > 0 && <ContactConvert />}
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
