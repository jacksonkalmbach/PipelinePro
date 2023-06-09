import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";

import {
  userSignOut,
  setIsDemo,
} from "../../store/reducers/user/userAuthSlice";

import EmployeeSelect from "../../components/employee-components/employee-select/EmployeeSelect";

import "./NavBar.scss";

interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company_name: string;
  job_title: string;
  photo_url: string;
}

const defaultUserData = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  company_name: "",
  job_title: "",
  photo_url: "",
};

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.pathname;

  const uid = useSelector((state: any) => state.userAuth.uid);
  const isSignedIn = useSelector((state: any) => state.userAuth.isSignedIn);
  const isDemo = useSelector((state: any) => state.userAuth.isDemo);

  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [sideNavVisible, setSideNavVisible] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    try {
      fetch(`http://localhost:5001/users/${uid}`)
        .then((res) => res.json())
        .then((data) => {
          setUserData(data);
        });
    } catch (error) {
      console.log("error fetching account info - navbar", error);
    }
  }, [uid]);

  const toggleSideNav = () => {
    setSideNavVisible(!sideNavVisible);
  };

  // const closeSideNav = () => {
  //   setSideNavVisible(false);
  // };

  const currentSection = useSelector(
    (state: any) => state.sectionNavigation.value
  );

  const showDropdownOptions = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogoClick = () => {
    dispatch(userSignOut());
    dispatch(setIsDemo(false));
    navigate("/");
  };

  const handleLogout = () => {
    dispatch(userSignOut());
    dispatch(setIsDemo(false));
    navigate("/");
  };

  const handleExitDemo = () => {
    dispatch(userSignOut());
    dispatch(setIsDemo(false));
    navigate("/");
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-logo" onClick={handleLogoClick}>
        <img className="logo" src="../../assets/pp-logo-white.png" alt="logo" />
      </div>
      <div className="hamburger-container" onClick={toggleSideNav}>
        <span className="material-symbols-outlined">menu</span>
      </div>
      {isSignedIn || isDemo ? (
        <>
          <div className="vertical-line"></div>
          <ul className="navbar-links">
            <li className="navbar-link">{currentSection}</li>
            <li className="navbar-link">
              <div className="account">
                {isDemo && (
                  <Link className="navbar-link" to="/">
                    <button
                      className="get-started-button"
                      onClick={handleExitDemo}
                    >
                      Exit Demo
                    </button>
                  </Link>
                )}
                <div onClick={showDropdownOptions}>
                  <EmployeeSelect
                    id={uid}
                    firstName={userData.first_name}
                    lastName={userData.last_name}
                    profilePic={
                      userData.photo_url
                        ? userData.photo_url
                        : userData.first_name[0] + userData.last_name[0]
                    }
                    nav={true}
                    title={userData.job_title}
                  />
                  {showDropdown && (
                    <div className="nav-dropdown-container">
                      <div className="nav-dropdown-item">
                        <Link
                          className="nav-dropdown-link"
                          to="/settings/Account"
                        >
                          Account
                        </Link>
                      </div>
                      <div className="nav-dropdown-item">
                        <Link
                          className="nav-dropdown-link"
                          to="/login"
                          onClick={handleLogout}
                        >
                          Logout
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
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
