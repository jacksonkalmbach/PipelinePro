import React from "react";

import "./NavBar.scss";

const NavBar = () => {
  return (
    <nav className="navbar-container">
      <div className="navbar-logo">LOGO</div>
      <div className="vertical-line"></div>
      <ul className="navbar-links">
        <li className="navbar-link">Dashboard</li>
        <li className="navbar-link">Current_User</li>
      </ul>
    </nav>
  );
};

export default NavBar;
