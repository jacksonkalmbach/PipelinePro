import React, { useEffect, useState } from "react";
import SubsectionNavbar from "../../components/navigation-components/subsection-navbar/SubsectionNavbar";
import { useSelector, useDispatch } from "react-redux";

import "./Dashboard.styles.scss";
import LeadList from "../../components/lead-components/lead-list-components/lead-list/LeadList";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [leads, setLeads] = useState([]);

  const currentUser = useSelector((state: any) => state.userAuth.displayName);
  const currentUserId = useSelector((state: any) => state.userAuth.uid);
  const currentUserFirstName = currentUser.split(" ")[0];

  useEffect(() => {
    fetch(`http://localhost:5001/leads/employee/${currentUserId}`)
      .then((res) => res.json())
      .then((data) => {
        setLeads(data);
      });
  }, [currentUserId]);

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
            <div className="my-leads-list">
              <LeadList leads={leads} searchPlaceholder="Search my leads" />
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
