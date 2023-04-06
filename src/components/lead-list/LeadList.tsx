import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSelectAllLeads } from "../../store/reducers/leads/selectAllLeadsSlice";
import Dropdown from "../dropdown/Dropdown";
import LeadRowItem from "../lead-row-item/LeadRowItem";
import LeadRowItemPlaceholder from "../lead-row-item/LeadRowItemPlaceholder";
import LEAD_DATA from "../../LEAD_DATA.json";

import "./LeadList.styles.scss";

const LeadList = () => {
  const placeholders = [];

  for (let i = 0; i < 10; i++) {
    placeholders.push(<LeadRowItemPlaceholder key={i} />);
  }

  const leadCount = 567;
  const { leads } = LEAD_DATA;
  const dispatch = useDispatch();
  const [checkAll, setCheckAll] = useState(false);
  const [dataLoad, setDataLoad] = useState(false);

  const leadsPerPage = [10, 20, 50];

  const handleSortClick = () => {
    console.log("handleSortClick");
  };

  const toggleCheckAll = () => {
    setCheckAll(!checkAll);
    dispatch(setSelectAllLeads());
  };

  useEffect(() => {
    setTimeout(() => {
      setDataLoad(true);
    }, 1000);
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
        <div className="leads-list-filters__name" onClick={handleSortClick}>
          <span className="material-symbols-outlined">unfold_more</span>NAME
        </div>
        <div className="leads-list-filters__contact" onClick={handleSortClick}>
          <span className="material-symbols-outlined">unfold_more</span>
          CONTACT
        </div>
        <div className="leads-list-filters__status" onClick={handleSortClick}>
          <span className="material-symbols-outlined">unfold_more</span>
          STATUS
        </div>
        <div className="leads-list-filters__owner" onClick={handleSortClick}>
          <span className="material-symbols-outlined">unfold_more</span>
          LEAD OWNER
        </div>
      </div>
      <div className="leads-list">
        {dataLoad
          ? leads.map((lead: any) => {
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
                  owner={leadOwner}
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
