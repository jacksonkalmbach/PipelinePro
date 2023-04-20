import React from "react";
import { useSelector } from "react-redux";
import AccoutManagerSelect from "../../components/employee-components/employee-select/EmployeeSelect";
import "./NavBar.scss";

const NavBar = () => {
  const currentSection = useSelector(
    (state: any) => state.sectionNavigation.value
  );

  const displayName = useSelector((state: any) => state.userAuth.displayName);
  const firstName = displayName.split(" ")[0];
  const lastName = displayName.split(" ")[1];
  const photoURL = useSelector((state: any) => state.userAuth.photoURL);
  const uid = useSelector((state: any) => state.userAuth.uid);

  console.log(uid);
  console.log(firstName);

  return (
    <nav className="navbar-container">
      <div className="navbar-logo">
        <img className="logo" src="../../pp-logo-white.png" alt="logo" />
      </div>
      <div className="vertical-line"></div>
      <ul className="navbar-links">
        <li className="navbar-link">{currentSection}</li>
        <li className="navbar-link">
          <AccoutManagerSelect
            id={uid}
            firstName={firstName}
            lastName={lastName}
            profilePic={photoURL ? photoURL : firstName[0] + lastName[0]}
            nav={true}
            title={"Account Manager"}
          />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
