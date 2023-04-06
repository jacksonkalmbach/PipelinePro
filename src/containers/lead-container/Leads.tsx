import React from "react";
import LeadRowItem from "../../components/lead-row-item/LeadRowItem";

import "./Leads.styles.scss";

const Leads = () => {
  const leadCount = 567;

  return (
    <div className="leads-container">
      <div className="leads-count">{leadCount} Leads</div>
      <div className="leads-filter-container"></div>
      <div className="leads-list-container">
        <div className="leads-list-filters">
          <div className="leads-list-filters__name">Name</div>
          <div className="leads-list-filters__contact">Contact</div>
          <div className="leads-list-filters__status">Status</div>
          <div className="leads-list-filters__owner">Owner</div>
        </div>
        <div className="leads-list">
          <LeadRowItem />
          <LeadRowItem />
          <LeadRowItem />
          <LeadRowItem />
          <LeadRowItem />
          <LeadRowItem />
          <LeadRowItem />
          <LeadRowItem />
          <LeadRowItem />
          <LeadRowItem />
          <LeadRowItem />
        </div>
      </div>
    </div>
  );
};

export default Leads;
