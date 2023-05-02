import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setShowLeadPreview,
  setPreviewId,
} from "../../../../store/reducers/leads/showLeadSlice";
import {
  addSelectedLeads,
  removeSelectedLeads,
  setSelectAllLeads,
} from "../../../../store/reducers/leads/selectAllLeadsSlice";

import LeadRowStatus from "../lead-row-status/LeadRowStatus";
import EmployeeSelect from "../../../employee-components/employee-select/EmployeeSelect";

import "./RowItem.styles.scss";

interface RowItemProps {
  id: string | null;
  employeeId: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  photoURL?: string;
  jobTitle?: string;
  department?: string;
  leadOwner?: string | undefined;
  status?: string;
  myLeads?: boolean;
  type: string;
}

interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  photo_url: string;
  title: string;
}

const RowItem = ({
  id,
  employeeId,
  firstName,
  lastName,
  email,
  phone,
  leadOwner,
  status,
  myLeads,
  jobTitle,
  department,
  photoURL,
  type,
}: RowItemProps) => {
  const dispatch = useDispatch();
  const [isSelected, setisSelected] = useState(false);
  const [ownerData, setOwnerData] = useState<Employee | null>(null);
  const [ownerFirstName, setOwnerFirstName] = useState("");
  const [ownerLastName, setOwnerLastName] = useState("");
  const [ownerPhotoURL, setOwnerPhotoURL] = useState("");
  const checkAll = useSelector((state: any) => state.selectAllLeads.selectAll);
  const selectedLeads = useSelector(
    (state: any) => state.selectAllLeads.selectedLeads
  );

  const toggleSelected = (
    e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLSpanElement>
  ) => {
    e.stopPropagation();
    if (isSelected) {
      setisSelected(false);
      dispatch(removeSelectedLeads(id));
    } else {
      setisSelected(true);
      dispatch(addSelectedLeads(id));
    }
  };

  useEffect(() => {
    if (selectedLeads.length === 1) {
      dispatch(setPreviewId(selectedLeads[0]));
    }
  }, [selectedLeads, dispatch]);

  useEffect(() => {
    if (checkAll) {
      setisSelected(true);
      dispatch(addSelectedLeads(id));
    } else {
      setisSelected(false);
      dispatch(removeSelectedLeads(id));
    }
  }, [checkAll, id, dispatch]);

  const handleLeadPreviewClick = () => {
    dispatch(setShowLeadPreview(true));
    dispatch(setPreviewId(id));
  };

  useEffect(() => {
    if (leadOwner) {
      fetch(`http://localhost:5001/users/${leadOwner}`)
        .then((res) => res.json())
        .then((data) => {
          setOwnerData(data);
          setOwnerFirstName(data.first_name);
          setOwnerLastName(data.last_name);
          setOwnerPhotoURL(data.photo_url);
          console.log("employee - LEADROWITEM", data);
        });
    }
  }, [leadOwner]);

  return (
    <div
      className={`row-item-container ${isSelected ? "selected" : ""}`}
      onClick={handleLeadPreviewClick}
    >
      {type === "leads" ? (
        <>
          <div
            className={`row-item__checkbox ${
              checkAll || isSelected ? "selected" : ""
            } ${isSelected ? "selected" : ""}}`}
            onClick={toggleSelected}
          >
            {checkAll || isSelected ? (
              <span
                className="material-symbols-outlined"
                onClick={toggleSelected}
              >
                check_box
              </span>
            ) : (
              <span
                className="material-symbols-outlined"
                onClick={toggleSelected}
              >
                check_box_outline_blank
              </span>
            )}
          </div>
        </>
      ) : (
        <div className="row-item__checkbox hide"></div>
      )}
      <div className="row-item__name">
        {type === "employees" ? (
          <>
            <EmployeeSelect
              id={employeeId}
              firstName={firstName}
              lastName={lastName}
              profilePic={photoURL}
            />
          </>
        ) : (
          <>{firstName + " " + lastName}</>
        )}
      </div>
      <div className="row-item__contact">
        <div className="row-item__contact_email">
          <span className="material-symbols-outlined">mail</span>
          {email}
        </div>
        <div className="row-item__contact_phone">
          <span className="material-symbols-outlined">call</span>
          {"(" +
            phone.slice(0, 3) +
            ") " +
            phone.slice(3, 6) +
            "-" +
            phone.slice(6, 10)}
        </div>
      </div>
      {status ? (
        <>
          <div className="row-item__status">
            <LeadRowStatus status={status} />
          </div>
          <div className="row-item__owner">
            {ownerData && (
              <EmployeeSelect
                id={leadOwner}
                firstName={ownerFirstName}
                lastName={ownerLastName}
                profilePic={ownerPhotoURL}
              />
            )}
          </div>
        </>
      ) : (
        <>
          <div className="row-item__title">{jobTitle}</div>
          <div className="row-item__department">{department}</div>
        </>
      )}
    </div>
  );
};

export default RowItem;
