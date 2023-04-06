import React, { useState, useEffect } from "react";
import LeadRowItem from "../../components/lead-row-item/LeadRowItem";

import "./Leads.styles.scss";
import LeadsData from "../../LEAD_DATA.json";
import { useDispatch, useSelector } from "react-redux";
import { setSelectAllLeads } from "../../store/reducers/leads/selectAllLeadsSlice";
import FilterAddLead from "../../components/filter-add-leads/FilterAddLeads";
import CreateLead from "../../components/create-lead/CreateLead";
import Dropdown from "../../components/dropdown/Dropdown";
import LeadRowItemPlaceholder from "../../components/lead-row-item/LeadRowItemPlaceholder";

const Leads = () => {
  const placeholders = [];

  for (let i = 0; i < 10; i++) {
    placeholders.push(<LeadRowItemPlaceholder />);
  }

  const leadCount = 567;
  const { leads } = LeadsData;
  const dispatch = useDispatch();
  const [checkAll, setCheckAll] = useState(false);
  const [dataLoad, setDataLoad] = useState(false);

  const leadsPerPage = [10, 20, 50];

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
    <div className="leads-container">
      <CreateLead />
      <div className="leads-count">{leadCount} Leads</div>
      <FilterAddLead />
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
            <span className="material-symbols-outlined">unfold_more</span>NAME
            CONTACT
          </div>
          <div className="leads-list-filters__status">
            <span className="material-symbols-outlined">unfold_more</span>NAME
            STATUS
          </div>
          <div className="leads-list-filters__owner">
            <span className="material-symbols-outlined">unfold_more</span>NAME
            LEAD OWNER
          </div>
        </div>
        <div className="leads-list">
          {dataLoad
            ? leads.map((lead: any) => {
                const { id, firstName, lastName, email, phone, leadOwner } =
                  lead;
                return (
                  <LeadRowItem
                    key={id}
                    firstName={firstName}
                    lastName={lastName}
                    email={email}
                    phone={phone}
                    owner={leadOwner}
                  />
                );
              })
            : placeholders}
        </div>
      </div>
    </div>
  );
};

export default Leads;
