import React, { useState } from "react";

import "./SectionNavbar.styles.scss";

const SectionNavbar = () => {
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(0);

  const handleSelectedSection = (index: number) => {
    setSelectedSectionIndex(index);
  };

  return (
    <div className="section-navbar-container">
      <div className="sections">
        <div
          className={`section-icon ${
            selectedSectionIndex === 0 ? "selected" : ""
          }`}
          onClick={() => handleSelectedSection(0)}
        >
          <span className="material-symbols-outlined">home</span>
          <div className="selected-bar"></div>
        </div>
        <div
          className={`section-icon ${
            selectedSectionIndex === 1 ? "selected" : ""
          }`}
          onClick={() => handleSelectedSection(1)}
        >
          <span className="material-symbols-outlined">
            perm_contact_calendar
          </span>
        </div>
        <div
          className={`section-icon ${
            selectedSectionIndex === 2 ? "selected" : ""
          }`}
          onClick={() => handleSelectedSection(2)}
        >
          <span className="material-symbols-outlined">calendar_month</span>
        </div>
      </div>
      <div
        className={`section-icon ${
          selectedSectionIndex === 3 ? "selected" : ""
        }`}
        onClick={() => handleSelectedSection(3)}
      >
        <div className="section-icon">
          <span className="material-symbols-outlined">settings</span>
        </div>
      </div>
    </div>
  );
};

export default SectionNavbar;
