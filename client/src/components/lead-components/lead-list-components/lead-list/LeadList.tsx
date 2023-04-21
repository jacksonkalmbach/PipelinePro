import React, { useState, useEffect } from "react";
// import io from "socket.io-client";
import { useDispatch } from "react-redux";
import {
  setSelectAllLeads,
  setLeadCount,
} from "../../../../store/reducers/leads/selectAllLeadsSlice";

import Dropdown from "../../../dropdown/Dropdown";
import LeadRowItem from "../lead-row-item/LeadRowItem";
import LeadRowItemPlaceholder from "../lead-row-item/LeadRowItemPlaceholder";

import EMPLOYEE_DATA from "../../../../EMPLOYEE_DATA.json";
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

interface LeadData {
  lead_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  leadOwner: number;
  lead_status: string;
}

const LeadList = () => {
  const [leads, setLeads] = useState<LeadData[]>([]);

  useEffect(() => {
    fetch("http://localhost:5001/leads")
      .then((res) => res.json())
      .then((data) => {
        setLeads(data);
        dispatch(setLeadCount(data.length));
      });
  }, []);

  const placeholders = [];
  const leadCount = leads ? leads.length : 0;

  for (let i = 0; i < 10; i++) {
    placeholders.push(<LeadRowItemPlaceholder key={i} />);
  }

  createEmployeeHash(EMPLOYEE_DATA.employees);
  const dispatch = useDispatch();
  const [checkAll, setCheckAll] = useState(false);

  const leadsPerPage = [10, 20, 50];

  const toggleCheckAll = () => {
    setCheckAll(!checkAll);
    dispatch(setSelectAllLeads());
  };

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
        <div className="leads-list-filters__name">
          <span className="material-symbols-outlined">unfold_more</span>NAME
        </div>
        <div className="leads-list-filters__contact">
          <span className="material-symbols-outlined">unfold_more</span>
          CONTACT
        </div>
        <div className="leads-list-filters__status">
          <span className="material-symbols-outlined">unfold_more</span>
          STATUS
        </div>
        <div className="leads-list-filters__owner">
          <span className="material-symbols-outlined">unfold_more</span>
          LEAD OWNER
        </div>
      </div>
      <div className="leads-list">
        {leads
          ? leads.map((lead: any) => {
              const {
                lead_id,
                first_name: firstName,
                last_name: lastName,
                email,
                phone,
                lead_owner: leadOwner,
                lead_status: leadStatus,
              } = lead;
              return (
                <LeadRowItem
                  key={lead_id}
                  id={lead_id}
                  firstName={firstName}
                  lastName={lastName}
                  email={email}
                  phone={phone}
                  leadOwner={leadOwner}
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
