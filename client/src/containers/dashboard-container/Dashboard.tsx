import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./Dashboard.styles.scss";
import LeadList from "../../components/lead-components/lead-list-components/lead-list/LeadList";
import LeadPreview from "../../components/lead-components/lead-preview/LeadPreview";
import DashboardEvent from "../../components/calendar-components/dashboard-event/DashboardEvent";

const Dashboard = () => {
  const [leads, setLeads] = useState([]);
  const [todaysEvents, setTodaysEvents] = useState([]);
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const todayDate = `${yyyy}-${mm}-${dd}`;

  const currentUserId = useSelector((state: any) => state.userAuth.uid);

  useEffect(() => {
    fetch(`http://localhost:5001/leads/employee/${currentUserId}`)
      .then((res) => res.json())
      .then((data) => {
        setLeads(data);
      });
  }, [currentUserId]);

  useEffect(() => {
    fetch(`http://localhost:5001/events/${todayDate}/${currentUserId}}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTodaysEvents(data);
      });
  }, [currentUserId, todayDate]);

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
          <h2>Today's Calendar</h2>
          <div className="today-events-container">
            {todaysEvents.length > 0 ? (
              todaysEvents.map((event: any) => {
                const { event_name, event_time } = event;
                return (
                  <DashboardEvent
                    eventTitle={event_name}
                    eventTime={event_time}
                  />
                );
              })
            ) : (
              <div className="no-events">No events today</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
