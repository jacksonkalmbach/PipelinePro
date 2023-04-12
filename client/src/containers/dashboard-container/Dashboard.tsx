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
      <div className="my-leads">
        <h1>My Leads</h1>
        <div className="my-leads-list"></div>
      </div>
    </div>
  );
};

export default Dashboard;
