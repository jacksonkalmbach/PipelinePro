import React, { useState, useEffect } from "react";
import LeadRowItem from "../lead-row-item/LeadRowItem";
import LeadRowItemPlaceholder from "../lead-row-item/LeadRowItemPlaceholder";
import LEAD_DATA from "../../LEAD_DATA.json";

import "./LeadList.styles.scss";

const { leads } = LEAD_DATA;

const LeadList = () => {
  const [dataLoad, setDataLoad] = useState(false);
  const placeholders = [];

  for (let i = 0; i < 10; i++) {
    placeholders.push(<LeadRowItemPlaceholder key={i} />);
  }

  useEffect(() => {
    setTimeout(() => {
      setDataLoad(true);
    }, 1000);
  }, [dataLoad]);

  return (
    <div leads-container>
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
