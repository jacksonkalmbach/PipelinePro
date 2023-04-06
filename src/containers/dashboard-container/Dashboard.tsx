import React from "react";
import LeadList from "../../components/lead-list/LeadList";

import "./Dashboard.styles.scss";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="my-leads">
        <h1>My Leads</h1>
        <div className="my-leads-list">
          <LeadList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
