import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectAllLeads } from "../../store/reducers/leads/selectAllLeadsSlice";

import {
  setSortAZ,
  setSortZA,
  setSortStatus,
  setSortLeadOwner,
} from "../../store/reducers/leads/sortLeadsSlice";

import Dropdown from "../dropdown/Dropdown";
import LeadRowItem from "../lead-row-item/LeadRowItem";
import LeadRowItemPlaceholder from "../lead-row-item/LeadRowItemPlaceholder";

import LEAD_DATA from "../../LEAD_DATA.json";
import EMPLOYEE_DATA from "../../EMPLOYEE_DATA.json";
import "./LeadList.styles.scss";

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  img: string;
  title: string;
}

interface EmployeeHash {
  [id: number]: { fullName: string; photoURL: string };
}

const employeeHash: EmployeeHash = {};

const createEmployeeHash = (array: Employee[]) => {
  array.forEach((employee) => {
    employeeHash[employee.id] = {
      fullName: employee.firstName + " " + employee.lastName,
      photoURL: employee.img,
    };
  });
};

const LeadList = () => {
  const { leads } = LEAD_DATA;
  const placeholders = [];
  const leadCount = 567;

  for (let i = 0; i < 10; i++) {
    placeholders.push(<LeadRowItemPlaceholder key={i} />);
  }

  createEmployeeHash(EMPLOYEE_DATA.employees);
  const dispatch = useDispatch();
  const [checkAll, setCheckAll] = useState(false);
  const [dataLoad, setDataLoad] = useState(false);

  const [sortedAZ, setSortedAZ] = useState(false);
  const [sortedLeads, setSortedLeads] = useState(leads);
  const [sortedStatus, setSortedStatus] = useState(false);
  const [sortedOwner, setSortedOwner] = useState(false);

  const leadsPerPage = [10, 20, 50];

  const toggleCheckAll = () => {
    setCheckAll(!checkAll);
    dispatch(setSelectAllLeads());
  };

  const handleSortClick = (type: string): void => {
    switch (type) {
      case "nameAZ":
        setSortedAZ(!sortedAZ);
        break;
      case "status":
        setSortedStatus(!sortedStatus);
        break;
      case "owner":
        setSortedOwner(!sortedOwner);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (sortedAZ) {
      dispatch(setSortAZ());
      const sorted = [...leads].sort((a: any, b: any) => {
        const nameA = a.lastName.toUpperCase();
        const nameB = b.lastName.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      setSortedLeads(sorted);
    } else if (sortedStatus) {
      dispatch(setSortStatus());
      const sorted = [...sortedLeads].sort((a: any, b: any) => {
        const statusA = a.leadStatus.toUpperCase();
        const statusB = b.leadStatus.toUpperCase();
        if (statusA < statusB) {
          return -1;
        }
        if (statusA > statusB) {
          return 1;
        }
        return 0;
      });
      setSortedLeads(sorted);
    }
  }, [sortedAZ, sortedStatus, leads, sortedLeads, dispatch]);

  useEffect(() => {
    setTimeout(() => {
      setDataLoad(true);
    }, 500);
  }, [dataLoad]);

  return (
    <div className="leads-list-container">
      <div className="leads-list-search">
        <input className="searchbar-leads" placeholder="Search leads"></input>
        <div className="leads-per-page">
          Showing&nbsp;
          <Dropdown title={10} options={leadsPerPage} />
          &nbsp;of&nbsp;
          <div style={{ fontWeight: "bold" }}>{leadCount}</div> &nbsp;results
        </div>
      </div>
      <div className="leads-list-filters">
        <div
          className={`leads-list-filters__checkbox ${
            checkAll ? "checkAll" : ""
          }`}
          onClick={toggleCheckAll}
        >
          {checkAll ? (
            <span className="material-symbols-outlined">
              indeterminate_check_box
            </span>
          ) : (
            <span className="material-symbols-outlined">
              check_box_outline_blank
            </span>
          )}
        </div>
        <div
          className="leads-list-filters__name"
          onClick={() => handleSortClick("nameAZ")}
        >
          <span className="material-symbols-outlined">unfold_more</span>NAME
        </div>
        <div className="leads-list-filters__contact">
          <span className="material-symbols-outlined">unfold_more</span>
          CONTACT
        </div>
        <div
          className="leads-list-filters__status"
          onClick={() => handleSortClick("status")}
        >
          <span className="material-symbols-outlined">unfold_more</span>
          STATUS
        </div>
        <div className="leads-list-filters__owner">
          <span className="material-symbols-outlined">unfold_more</span>
          LEAD OWNER
        </div>
      </div>
      <div className="leads-list">
        {dataLoad
          ? sortedLeads.map((lead: any) => {
              const {
                id,
                firstName,
                lastName,
                email,
                phone,
                leadOwner,
                leadStatus,
              } = lead;
              return (
                <LeadRowItem
                  key={id}
                  firstName={firstName}
                  lastName={lastName}
                  email={email}
                  phone={phone}
                  photoURL={employeeHash[leadOwner].photoURL}
                  owner={employeeHash[leadOwner].fullName}
                  status={leadStatus}
                />
              );
            })
          : placeholders}
      </div>
    </div>
  );
};

export default LeadList;
