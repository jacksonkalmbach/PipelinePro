import React from "react";
import { Outlet } from "react-router-dom";
import SubsectionNavbar from "../../components/navigation-components/subsection-navbar/SubsectionNavbar";

import "./Calendar.styles.scss";

const Calendar = () => {
  return (
    <>
      <div className="calendar-container">
        <SubsectionNavbar title="calendar" options={["calendar", "calendar"]} />
      </div>
      <Outlet />
    </>
  );
};

export default Calendar;
