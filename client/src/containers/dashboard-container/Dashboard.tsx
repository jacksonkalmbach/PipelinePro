import React from "react";
import SubsectionNavbar from "../../components/navigation-components/subsection-navbar/SubsectionNavbar";
import { useSelector } from "react-redux";

import "./Dashboard.styles.scss";

const Dashboard = () => {
  const currentUser = useSelector((state: any) => state.userAuth.displayName);
  const currentUserFirstName = currentUser.split(" ")[0];

  return (
    <div className="dashboard-container">
      <SubsectionNavbar
        title="dahsboard"
        options={[`${currentUserFirstName} home`, "Sales"]}
      />
      <div className="dashboard-content">
        <div className="activity-leads-container">
          <div className="my-activity">
            <h2>My activity</h2>
          </div>
          <div className="my-leads">
            <h2>My leads</h2>
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
