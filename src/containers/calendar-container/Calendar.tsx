import React from "react";
import SectionNavbar from "../subsection-navbar/SectionNavbar";

const Calendar = () => {
  return (
    <div>
      <SectionNavbar
        section={"calendar"}
        sectionTitles={["calendar1", "calendar2"]}
      />
    </div>
  );
};

export default Calendar;
