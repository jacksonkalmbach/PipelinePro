import React, { useState, useEffect } from "react";
import LeadRowStatus from "../lead-row-status/LeadRowStatus";
import { useSelector } from "react-redux";

import "./LeadRowItem.styles.scss";
import AccoutManagerSelect from "../employees/AccountManagerSelect";

interface LeadRowItemProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  owner: string;
  status: string;
}

const LeadRowItem = ({
  firstName,
  lastName,
  email,
  phone,
  owner,
  status,
}: LeadRowItemProps) => {
  const [isSelected, setisSelected] = useState(false);
  const checkAll = useSelector((state: any) => state.selectAllLeads.value);

  useEffect(() => {
    setisSelected(checkAll);
  }, [checkAll]);

  const toggleSelected = () => {
    setisSelected(!isSelected);
  };

  return (
    <div className={`lead-row-item ${isSelected ? "selected" : ""}`}>
      <div
        className={`lead-row-item__checkbox ${
          checkAll || isSelected ? "selected" : ""
        } ${isSelected ? "selected" : ""}}`}
        onClick={toggleSelected}
      >
        {checkAll || isSelected ? (
          <span className="material-symbols-outlined">check_box</span>
        ) : (
          <span className="material-symbols-outlined">
            check_box_outline_blank
          </span>
        )}
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
        <LeadRowStatus status={status} />
      </div>
      <div className="lead-row-item__owner">
        <AccoutManagerSelect
          firstName="Mike"
          lastName="Johnson"
          profilePic="https://www.eikonphoto.com/wp-content/uploads/2017/03/male-headshot-e1515783468636.jpg"
        />
      </div>
    </div>
  );
};

export default LeadRowItem;
