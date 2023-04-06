import React from "react";
import LeadRowStatus from "../lead-row-status/LeadRowStatus";

import "./LeadRowItem.styles.scss";

interface LeadRowItemProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  owner: string;
}

const LeadRowItem = ({
  firstName,
  lastName,
  email,
  phone,
  owner,
}: LeadRowItemProps) => {
  return (
    <div className="lead-row-item">
      <div className="lead-row-item__checkbox">
        <span className="material-symbols-outlined">
          check_box_outline_blank
        </span>
      </div>
      <div className="lead-row-item__name">{firstName + " " + lastName}</div>
      <div className="lead-row-item__contact">
        <div className="lead-row-item__contact_email">
          <span className="material-symbols-outlined">mail</span>
          {email}
        </div>
        <div className="lead-row-item__contact_phone">
          <span className="material-symbols-outlined">call</span>
          {phone}
        </div>
      </div>
      <div className="lead-row-item__status">
        <LeadRowStatus />
      </div>
      <div className="lead-row-item__owner">{owner}</div>
    </div>
  );
};

export default LeadRowItem;
