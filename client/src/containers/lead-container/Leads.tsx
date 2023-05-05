import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useSelector } from "react-redux";

import FilterAddLead from "../../components/lead-components/filter-add-leads/FilterAddLeads";
import CreateLead from "../../components/lead-components/create-lead/CreateLead";
import List from "../../components/lead-components/lead-list-components/list/List";

import "./Leads.styles.scss";
import LeadPreview from "../../components/lead-components/lead-preview/LeadPreview";
import ContactConvert from "../../components/contact-convert/ContactConvert";
import CompanyList from "../../components/company-components/company-list/CompanyList";

interface LeadData {
  lead_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  leadOwner: string;
  lead_status: string;
}

const Leads = () => {
  const { ws } = useContext(UserContext);
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

    const handleUpdateLeads = () => {
      fetch("http://localhost:5001/leads")
        .then((res) => res.json())
        .then((data) => {
          setLeads(data);
          setLeadCount(data.length);
        });
    };

    ws.on("update-leads", handleUpdateLeads);

    return () => {
      ws.off("update-leads", handleUpdateLeads);
    };
  }, [ws]);

  return (
    <div className="leads-container">
      <div className="count-and-create">
        <div className="leads-count">{leadCount} Leads</div>
        <CompanyList />
        <CreateLead />
        <LeadPreview />
        <div className="filters-and-add-lead">
          <FilterAddLead />
        </div>
      </div>
      {leadSelected.length > 0 && <ContactConvert />}
      <div className="all-leads-list">
        <List
          type="leads"
          leads={leads}
          leadCount={leadCount}
          searchPlaceholder="Search all leads"
        />
      </div>
    </div>
  );
};

export default Leads;
