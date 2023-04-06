import React from "react";

import "./LeadRowItem.styles.scss";

const LeadRowItem = () => {
  return (
    <div className="lead-row-item">
      <div className="lead-row-item__name">Lead Name</div>
      <div className="lead-row-item__contact">
        <div className="lead-row-item__contact_email">
          <span className="material-symbols-outlined">mail</span>
          Email Address
        </div>
        <div className="lead-row-item__contact_phone">
          <span className="material-symbols-outlined">call</span>
          XXX-XXX-XXXX
        </div>
      </div>
      <div className="lead-row-item__status">New</div>
      <div className="lead-row-item__owner">Lead Owner</div>
    </div>
  );
};

export default LeadRowItem;
