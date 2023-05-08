import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectAllLeads } from "../../../../store/reducers/leads/selectAllLeadsSlice";

import SearchBox from "../../../search-box-component/SearchBox";
import RowItem from "../lead-row-item/RowItem";
import LeadRowItemPlaceholder from "../lead-row-item/LeadRowItemPlaceholder";

import "./List.styles.scss";

interface ListProps {
  leads: LeadData[];
  leadCount?: number | null;
  myLeads?: boolean;
  searchPlaceholder: string;
  type: string;
}

interface LeadData {
  lead_id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  leadOwner?: string;
  lead_status?: string;
  job_title?: string;
  department?: string;
}

const List = ({
  leads,
  leadCount,
  searchPlaceholder,
  myLeads,
  type,
}: ListProps) => {
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

  const checkAll = useSelector((state: any) => state.selectAllLeads.selectAll);

  const toggleCheckAll = () => {
    if (checkAll) {
      dispatch(setSelectAllLeads(false));
    } else {
      dispatch(setSelectAllLeads(true));
    }
  };

  return (
    <div className="list-container">
      <div className="list-search">
        <SearchBox
          className={"all-leads"}
          placeholder={searchPlaceholder}
          onChangeHandler={onSearchChange}
        />
      </div>
      <div className="list-filters">
        {type === "leads" ? (
          <>
            <div
              className={`list-filters__checkbox ${checkAll ? "checkAll" : ""}`}
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
          </>
        ) : (
          <div className="list-filters__checkbox hide"></div>
        )}
        <div className="list-filters__filter name">NAME</div>
        <div className="list-filters__filter contact">CONTACT</div>
        <div className="list-filters__filter status">
          {type === "leads" ? "STATUS" : "JOB TITLE"}
        </div>
        <div className="list-filters__filter owner">
          {type === "leads" ? "LEAD OWNER" : "DEPARTMENT"}
        </div>
      </div>
      <div className="leads-list">
        {filteredLeads
          ? filteredLeads.reverse().map((lead: any) => {
              const {
                id,
                first_name: firstName,
                last_name: lastName,
                email,
                phone,
                lead_owner: leadOwner,
                lead_status: leadStatus,
              } = lead;
              return (
                <RowItem
                  key={id}
                  id={id}
                  employeeId={lead.id}
                  firstName={firstName}
                  lastName={lastName}
                  email={email}
                  phone={phone}
                  leadOwner={leadOwner}
                  status={leadStatus}
                  myLeads={myLeads}
                  jobTitle={lead.job_title}
                  department={lead.department}
                  photoURL={lead.photo_url}
                  type={type}
                />
              );
            })
          : placeholders}
      </div>
    </div>
  );
};

export default List;
