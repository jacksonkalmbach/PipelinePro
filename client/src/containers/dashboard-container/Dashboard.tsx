import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import List from "../../components/lead-components/lead-list-components/list/List";
import LeadPreview from "../../components/lead-components/lead-preview/LeadPreview";
import DashboardEvent from "../../components/calendar-components/dashboard-event/DashboardEvent";

import "./Dashboard.styles.scss";

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
    try {
      fetch(`http://localhost:5001/leads/employee/${currentUserId}`)
        .then((res) => res.json())
        .then((data) => {
          setLeads(data);
        });
    } catch (error) {
      console.log("Error fetching user in Dashboard.tsx", error);
    }
  }, [currentUserId]);

  useEffect(() => {
    try {
      fetch(`http://localhost:5001/events/${todayDate}/${currentUserId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setTodaysEvents(data);
        });
    } catch (error) {
      console.log("Error fetching events in Dashboard.tsx", error);
    }
  }, [currentUserId, todayDate]);

  return (
    <div className="dashboard-container">
      <LeadPreview />
      <div className="dashboard-content">
        <div className="activity-leads-container">
          <div className="my-leads">
            <h2>My Leads</h2>
            <div className="my-leads-list">
              <List
                type="leads"
                leads={leads}
                searchPlaceholder="Search my leads"
                myLeads={true}
              />
            </div>
          </div>
          <div className="my-activity">
            <h2>My Activity</h2>
            <div className="my-activity-list">
              <div className="activity">
                <div className="activity__number">13</div>
                <div className="activity__text">New leads this week</div>
                <div className="activity__change negative">
                  -5% from last week
                </div>
              </div>
              <div className="activity">
                <div className="activity__number">6</div>
                <div className="activity__text">Deals Closed</div>
                <div className="activity__change positive">
                  +15% from last week
                </div>
              </div>
              <div className="activity">
                <div className="activity__number">8</div>
                <div className="activity__text">Deals in progress</div>
                <div className="activity__change positive">
                  +12% from last week
                </div>
              </div>
              <div className="activity">
                <div className="activity__number">$5,240</div>
                <div className="activity__text">Total Revenue</div>
                <div className="activity__change positive">
                  +10% from last week
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-calendar">
          <h2>Today's Events</h2>
          <div className="today-events-container">
            <div className="today-events-container__content">
              {todaysEvents.length > 0 ? (
                todaysEvents.map((event: any) => {
                  const { id, event_name, event_time, event_description } =
                    event;
                  return (
                    <DashboardEvent
                      key={id}
                      eventId={id}
                      eventTitle={event_name}
                      eventTime={event_time}
                      eventDescription={event_description}
                    />
                  );
                })
              ) : (
                <div className="no-events">No Events Today</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
