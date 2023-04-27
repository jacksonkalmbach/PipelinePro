import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./Dashboard.styles.scss";
import LeadList from "../../components/lead-components/lead-list-components/lead-list/LeadList";
import LeadPreview from "../../components/lead-components/lead-preview/LeadPreview";

const Dashboard = () => {
  const [leads, setLeads] = useState([]);

  const currentUserId = useSelector((state: any) => state.userAuth.uid);

  useEffect(() => {
    fetch(`http://localhost:5001/leads/employee/${currentUserId}`)
      .then((res) => res.json())
      .then((data) => {
        setLeads(data);
      });
  }, [currentUserId]);

  return (
    <div className="dashboard-container">
      <LeadPreview />
      <div className="dashboard-content">
        <div className="activity-leads-container">
          <div className="my-activity">
            <h2>My activity</h2>
          </div>
          <div className="my-leads">
            <h2>My leads</h2>
            <div className="my-leads-list">
              <LeadList
                leads={leads}
                searchPlaceholder="Search my leads"
                myLeads={true}
              />
            </div>
          </div>
        </div>
        <div className="my-calendar">
          <h2>My calendar</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
