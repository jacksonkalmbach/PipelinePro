import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setShowLeadPreview,
  setPreviewId,
} from "../../../../store/reducers/leads/showLeadSlice";

import LeadRowStatus from "../lead-row-status/LeadRowStatus";
import AccoutManagerSelect from "../../../employee-components/employee-select/EmployeeSelect";

import "./LeadRowItem.styles.scss";

interface LeadRowItemProps {
  id: number | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  photoURL?: string;
  leadOwner?: number | undefined;
  status: string;
}

interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  profile_pic: string;
  title: string;
}

const LeadRowItem = ({
  id,
  firstName,
  lastName,
  email,
  phone,
  photoURL,
  leadOwner,
  status,
}: LeadRowItemProps) => {
  const dispatch = useDispatch();
  const [isSelected, setisSelected] = useState(false);
  const [ownerData, setOwnerData] = useState<Employee | null>(null);
  const [ownerFirstName, setOwnerFirstName] = useState("");
  const [ownerLastName, setOwnerLastName] = useState("");
  const [ownerPhotoURL, setOwnerPhotoURL] = useState("");
  const checkAll = useSelector((state: any) => state.selectAllLeads.value);

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

  useEffect(() => {
    if (leadOwner) {
      fetch(`http://localhost:5001/employees/${leadOwner}`)
        .then((res) => res.json())
        .then((data) => {
          setOwnerData(data);
          setOwnerFirstName(data.first_name);
          setOwnerLastName(data.last_name);
          setOwnerPhotoURL(data.profile_pic);
        });
    }
  }, [leadOwner]);

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
        {ownerData && (
          <AccoutManagerSelect
            id={leadOwner}
            firstName={ownerFirstName}
            lastName={ownerLastName}
            profilePic={ownerPhotoURL}
          />
        )}
      </div>
    </div>
  );
};

export default LeadRowItem;
