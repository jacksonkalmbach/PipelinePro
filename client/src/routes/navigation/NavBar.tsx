import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { userSignOut } from "../../store/reducers/user/userAuthSlice";
import AccoutManagerSelect from "../../components/employee-components/employee-select/EmployeeSelect";
import "./NavBar.scss";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.pathname;

  const currentSection = useSelector(
    (state: any) => state.sectionNavigation.value
  );

  const displayName = useSelector((state: any) => state.userAuth.displayName);
  const firstName = displayName.split(" ")[0];
  const lastName = displayName.split(" ")[1];
  const photoURL = useSelector((state: any) => state.userAuth.photoURL);
  const uid = useSelector((state: any) => state.userAuth.uid);
  const isSignedIn = useSelector((state: any) => state.userAuth.isSignedIn);

  const handleLogoClick = () => {
    navigate("/");
    dispatch(userSignOut());
  };

  const handleExitDemo = () => {
    dispatch(userSignOut());
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-logo" onClick={handleLogoClick}>
        <img className="logo" src="../../assets/pp-logo-white.png" alt="logo" />
      </div>
      {isSignedIn ? (
        <>
          <div className="vertical-line"></div>
          <ul className="navbar-links">
            <li className="navbar-link">{currentSection}</li>
            <li className="navbar-link">
              <div className="demo-account">
                <AccoutManagerSelect
                  id={uid}
                  firstName={firstName}
                  lastName={lastName}
                  profilePic={photoURL ? photoURL : firstName[0] + lastName[0]}
                  nav={true}
                  title={"Account Manager"}
                />
                <Link className="navbar-link" to="/">
                  <button onClick={handleExitDemo}>Exit Demo</button>
                </Link>
              </div>
            </li>
          </ul>
        </>
      ) : (
        <>
          <ul className="navbar-links">
            <Link className="navbar-link" to="/about">
              About
            </Link>
            <Link className="navbar-link" to="/login">
              <button
                className={`get-started-button ${
                  pathname === "/login" && "login"
                }`}
              >
                Get Started
              </button>
            </Link>
          </ul>
        </>
      )}
    </nav>
  );
};

export default NavBar;
