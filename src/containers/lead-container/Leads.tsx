import React, { useState } from "react";
import LeadRowItem from "../../components/lead-row-item/LeadRowItem";

import "./Leads.styles.scss";
import LeadsData from "../../LEAD_DATA.json";
import { useDispatch } from "react-redux";
import { setSelectAllLeads } from "../../store/reducers/leads/selectAllLeadsSlice";

const Leads = () => {
  const leadCount = 567;
  const { leads } = LeadsData;
  const dispatch = useDispatch();
  const [checkAll, setCheckAll] = useState(false);

  const toggleCheckAll = () => {
    setCheckAll(!checkAll);
    dispatch(setSelectAllLeads());
  };

  return (
    <div className="leads-container">
      <div className="leads-count">{leadCount} Leads</div>
      {/* <LeadFilters /> */}
      <div className="leads-list-container">
        <div className="leads-list-search"></div>
        <div className="leads-list-filters">
          <div
            className={`leads-list-filters__checkbox ${
              checkAll ? "checkAll" : ""
            }`}
            onClick={toggleCheckAll}
          >
            {checkAll ? (
              <span className="material-symbols-outlined">check_box</span>
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
          {leads.map((lead: any) => {
            const { id, firstName, lastName, email, phone, leadOwner } = lead;
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
          })}
        </div>
      </div>
    </div>
  );
};

export default Leads;
