import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setSectionNavigation } from "../../../store/reducers/navigation/sectionNavigationSlice";

import "./MainSectionsNavbar.styles.scss";

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
          <Link to="/dashboard" className="link">
            <span className="material-symbols-outlined">home</span>
          </Link>
        </div>
        <div
          className={`section-icon ${
            selectedSectionIndex === 1 ? "selected" : ""
          }`}
          onClick={() => handleSelectedSection(1, "Contacts")}
        >
          <Link to="/contacts" className="link">
            <span className="material-symbols-outlined">
              perm_contact_calendar
            </span>
          </Link>
        </div>
        <div
          className={`section-icon ${
            selectedSectionIndex === 2 ? "selected" : ""
          }`}
          onClick={() => handleSelectedSection(2, "Calendar")}
        >
          <Link to="/calendar" className="link">
            <span className="material-symbols-outlined">calendar_month</span>
          </Link>
        </div>
      </div>
      <div
        className={`section-icon ${
          selectedSectionIndex === 3 ? "selected" : ""
        }`}
        onClick={() => handleSelectedSection(3, "Settings")}
      >
        <div className="section-icon">
          <Link to="/settings" className="link">
            <span className="material-symbols-outlined">settings</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SectionNavbar;
