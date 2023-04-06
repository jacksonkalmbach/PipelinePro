import React from "react";

import "./Dashboard.styles.scss";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="my-leads">
        <h1>My Leads</h1>
        <div className="my-leads-list"></div>
      </div>
    </div>
  );
};

export default Dashboard;
