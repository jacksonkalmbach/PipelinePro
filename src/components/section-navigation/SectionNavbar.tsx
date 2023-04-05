import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSectionNavigation } from "../../store/reducers/navigation/sectionNavigationSlice";

import "./SectionNavbar.styles.scss";

const SectionNavbar = () => {
  const dispatch = useDispatch();
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(0);

  const handleSelectedSection = (index: number, value: string) => {
    setSelectedSectionIndex(index);
    dispatch(setSectionNavigation(value));
  };

  return (
    <div className="section-navbar-container">
      <div className="sections">
        <div
          className={`section-icon ${
            selectedSectionIndex === 0 ? "selected" : ""
          }`}
          onClick={() => handleSelectedSection(0, "Dashboard")}
        >
          <span className="material-symbols-outlined">home</span>
          <div className="selected-bar"></div>
        </div>
        <div
          className={`section-icon ${
            selectedSectionIndex === 1 ? "selected" : ""
          }`}
          onClick={() => handleSelectedSection(1, "Contacts")}
        >
          <span className="material-symbols-outlined">
            perm_contact_calendar
          </span>
        </div>
        <div
          className={`section-icon ${
            selectedSectionIndex === 2 ? "selected" : ""
          }`}
          onClick={() => handleSelectedSection(2, "Calendar")}
        >
          <span className="material-symbols-outlined">calendar_month</span>
        </div>
      </div>
      <div
        className={`section-icon ${
          selectedSectionIndex === 3 ? "selected" : ""
        }`}
        onClick={() => handleSelectedSection(3, "Settings")}
      >
        <div className="section-icon">
          <span className="material-symbols-outlined">settings</span>
        </div>
      </div>
    </div>
  );
};

export default SectionNavbar;
