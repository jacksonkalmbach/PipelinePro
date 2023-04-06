import React from "react";
import LeadRowItem from "../../components/lead-row-item/LeadRowItem";

import "./Leads.styles.scss";
import LeadsData from "../../LEAD_DATA.json";

const Leads = () => {
  const leadCount = 567;

  const { leads } = LeadsData;

  return (
    <div className="leads-container">
      <div className="leads-count">{leadCount} Leads</div>
      <div className="leads-filter-container"></div>
      <div className="leads-list-container">
        <div className="leads-list-filters">
          <div className="leads-list-filters__checkbox">
            <span className="material-symbols-outlined">
              check_box_outline_blank
            </span>
          </div>
          <div className="leads-list-filters__name">Name</div>
          <div className="leads-list-filters__contact">Contact</div>
          <div className="leads-list-filters__status">Status</div>
          <div className="leads-list-filters__owner">Owner</div>
        </div>
        <div className="leads-list">
          {leads.map((lead: any) => {
            const { id, firstName, lastName, email, phone, leadOwner } = lead;
            return (
              <LeadRowItem
                key={id}
                firstName={firstName}
                lastName={lastName}
                email={email}
                phone={phone}
                owner={leadOwner}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Leads;
