import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./SubsectionNavbar.styles.scss";

interface SubsectionNavbarProps {
  title: string;
  options: string[];
}

const SubsectionNavbar = ({ title, options }: SubsectionNavbarProps) => {
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(0);

  const handleSelectedSection = (index: number) => {
    setSelectedSectionIndex(index);
  };

  const subSections = [];

  for (let i = 0; i < options.length; i++) {
    subSections.push(
      <Link
        key={i}
        to={options[i]}
        className={`subsection-link ${
          selectedSectionIndex === i ? "selected" : ""
        }`}
        onClick={() => handleSelectedSection(i)}
      >
        {options[i]}
      </Link>
    );
  }

  return (
    <>
      <div className="subsection-navbar-container">
        <ul className="subsections-container">{subSections}</ul>
      </div>
      <Outlet />
    </>
  );
};

export default SubsectionNavbar;
