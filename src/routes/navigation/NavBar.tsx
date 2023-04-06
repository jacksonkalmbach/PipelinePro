import React from "react";
import { useSelector } from "react-redux";
import AccoutManagerSelect from "../../components/employees/AccountManagerSelect";
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
        <li className="navbar-link">
          <AccoutManagerSelect
            firstName="Mike"
            lastName="Johnson"
            profilePic="https://www.eikonphoto.com/wp-content/uploads/2017/03/male-headshot-e1515783468636.jpg"
            nav={true}
          />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
