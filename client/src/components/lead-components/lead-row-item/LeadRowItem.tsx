import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setShowLeadPreview,
  setPreviewId,
  setShowCreateLead,
} from "../../../store/reducers/leads/showLeadSlice";

import LeadRowStatus from "../lead-row-status/LeadRowStatus";
import AccoutManagerSelect from "../../employee-components/employee-select/EmployeeSelect";

import "./LeadRowItem.styles.scss";

interface LeadRowItemProps {
  id: number | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  photoURL?: string;
  owner?: string;
  status: string;
}

const LeadRowItem = ({
  id,
  firstName,
  lastName,
  email,
  phone,
  photoURL,
  owner,
  status,
}: LeadRowItemProps) => {
  const dispatch = useDispatch();

  const [isSelected, setisSelected] = useState(false);
  const checkAll = useSelector((state: any) => state.selectAllLeads.value);
  const leadPreviewId = useSelector((state: any) => state.showLead);

  let ownerFirstName = "";
  let ownerLastName = "";

  if (owner !== undefined) {
    ownerFirstName = owner.split(" ")[0];
    ownerLastName = owner.split(" ")[1];
  }

  useEffect(() => {
    setisSelected(checkAll);
  }, [checkAll]);

  const toggleSelected = (e: React.MouseEvent) => {
    e.stopPropagation();
    setisSelected(!isSelected);
  };

  const handleLeadPreviewClick = () => {
    dispatch(setShowLeadPreview(true));
    dispatch(setPreviewId(id));
  };

  return (
    <div
      className={`lead-row-item ${isSelected ? "selected" : ""}`}
      onClick={handleLeadPreviewClick}
    >
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
          {"(" +
            phone.slice(0, 3) +
            ") " +
            phone.slice(3, 6) +
            "-" +
            phone.slice(6, 10)}
        </div>
      </div>
      <div className="lead-row-item__status">
        <LeadRowStatus status={status} />
      </div>
      <div className="lead-row-item__owner">
        <AccoutManagerSelect
          id={1}
          firstName={ownerFirstName}
          lastName={ownerLastName}
          profilePic={photoURL}
        />
      </div>
    </div>
  );
};

export default LeadRowItem;
