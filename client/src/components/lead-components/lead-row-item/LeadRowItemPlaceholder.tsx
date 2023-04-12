import React from "react";

import "./LeadRowItemPlaceholder.styles.scss";

const LeadRowItemPlaceholder = () => {
  return (
    <div className="lead-row-item-placeholder">
      <div className="lead-row-item__checkbox">
        <span className="material-symbols-outlined">
          check_box_outline_blank
        </span>
      </div>
      <div className="lead-row-item__name">
        <div className="name-placeholder"></div>
      </div>
      <div className="lead-row-item__contact">
        <div className="email-placeholder"></div>
        <div className="phone-placeholder"></div>
      </div>
      <div className="lead-row-item__status">
        <div className="status-placeholder"></div>
      </div>
      <div className="lead-row-item__owner">
        <div className="owner-placeholder"></div>
      </div>
    </div>
  );
};

export default LeadRowItemPlaceholder;
