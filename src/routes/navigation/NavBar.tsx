import React from "react";
import { useSelector } from "react-redux";
import "./NavBar.scss";

const NavBar = () => {
  const currentSection = useSelector(
    (state: any) => state.sectionNavigation.value
  );

  return (
    <nav className="navbar-container">
      <div className="navbar-logo">LOGO</div>
      <div className="vertical-line"></div>
      <ul className="navbar-links">
        <li className="navbar-link">{currentSection}</li>
        <li className="navbar-link">Current_User</li>
      </ul>
    </nav>
  );
};

export default NavBar;