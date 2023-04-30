import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { userSignOut } from "../../store/reducers/user/userAuthSlice";
import EmployeeSelect from "../../components/employee-components/employee-select/EmployeeSelect";
import "./NavBar.scss";

interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company_name: string;
  job_title: string;
  profile_pic: string;
}

const defaultUserData = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  company_name: "",
  job_title: "",
  profile_pic: "",
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
      fetch(`http://localhost:5001/employees/${uid}`)
        .then((res) => res.json())
        .then((data) => setUserData(data));
    } catch (error) {
      console.log("error fetching account info - navbar", error);
    }
  }, [uid]);

  const toggleSideNav = () => {
    setSideNavVisible(!sideNavVisible);
  };

  const closeSideNav = () => {
    setSideNavVisible(false);
  };

  const currentSection = useSelector(
    (state: any) => state.sectionNavigation.value
  );

  const showDropdownOptions = () => {
    setShowDropdown(!showDropdown);
  };

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
      <div className="hamburger-container" onClick={toggleSideNav}>
        <span className="material-symbols-outlined">menu</span>
      </div>
      {isSignedIn ? (
        <>
          <div className="vertical-line"></div>
          <ul className="navbar-links">
            <li className="navbar-link">{currentSection}</li>
            <li className="navbar-link">
              <div className="account">
                <div onClick={showDropdownOptions}>
                  <EmployeeSelect
                    id={uid}
                    firstName={userData.first_name}
                    lastName={userData.last_name}
                    profilePic={
                      userData.profile_pic
                        ? userData.profile_pic
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
                          onClick={showDropdownOptions}
                        >
                          Account
                        </Link>
                      </div>
                      <div className="nav-dropdown-item">
                        <Link
                          className="nav-dropdown-link"
                          to="/login"
                          onClick={showDropdownOptions}
                        >
                          Logout
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
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
