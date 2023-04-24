import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSelectAllLeads } from "../../../../store/reducers/leads/selectAllLeadsSlice";

import SearchBox from "../../../search-box-component/SearchBox";
import LeadRowItem from "../lead-row-item/LeadRowItem";
import LeadRowItemPlaceholder from "../lead-row-item/LeadRowItemPlaceholder";

import "./LeadList.styles.scss";

interface LeadListProps {
  leads: LeadData[];
  leadCount?: number | null;
  searchPlaceholder: string;
}

interface LeadData {
  lead_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  leadOwner: number;
  lead_status: string;
}

const LeadList = ({ leads, leadCount, searchPlaceholder }: LeadListProps) => {
  const dispatch = useDispatch();

  const [searchField, setSearchField] = useState("");
  const [filteredLeads, setFilteredLeads] = useState<LeadData[]>(leads);

  useEffect(() => {
    const newFilteredLeads = leads.filter((lead) => {
      return (
        (lead.first_name &&
          lead.first_name.toLocaleLowerCase().includes(searchField)) ||
        (lead.last_name &&
          lead.last_name.toLocaleLowerCase().includes(searchField))
      );
    });

    setFilteredLeads(newFilteredLeads);
  }, [searchField, leads]);

  const onSearchChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };

  const placeholders = [];

  for (let i = 0; i < 10; i++) {
    placeholders.push(<LeadRowItemPlaceholder key={i} />);
  }

  const [checkAll, setCheckAll] = useState(false);

  const toggleCheckAll = () => {
    setCheckAll(!checkAll);
    dispatch(setSelectAllLeads());
  };

  return (
    <div className="leads-list-container">
      <div className="leads-list-search">
        <SearchBox
          className={"all-leads"}
          placeholder={searchPlaceholder}
          onChangeHandler={onSearchChange}
        />
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
        {filteredLeads
          ? filteredLeads.reverse().map((lead: any) => {
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
