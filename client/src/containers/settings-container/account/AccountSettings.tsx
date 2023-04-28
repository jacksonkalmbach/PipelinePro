import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./AccountSettings.styles.scss";

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

const AccountSettings = () => {
  const currentUser = useSelector((state: any) => state.userAuth.uid);
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [editInfo, setEditInfo] = useState<boolean>(false);

  const isDemo = useSelector((state: any) => state.userAuth.isDemo);

  useEffect(() => {
    try {
      fetch(`http://localhost:5001/employees/${currentUser}`)
        .then((res) => res.json())
        .then((data) => setUserData(data));
    } catch (error) {
      console.log("error fetching user data - account settings page", error);
    }
  }, [currentUser]);

  const handleEditInfo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isDemo) {
      alert("This is a demo account. You cannot edit the user information.");
    } else {
      setEditInfo(false);
    }
  };

  const handleEditClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    setEditInfo(!editInfo);
  };

  const handleCancelEdit = () => {
    setEditInfo(false);
  };

  const handleEditPhoto = () => {
    if (isDemo) {
      alert("This is a demo account. You cannot edit the user photo.");
    }
  };

  return (
    <div className="account-settings-container">
      <h2 className="title">Account Information</h2>
      <div className="account-settings-content">
        <form className="edit-personal-information" onSubmit={handleEditInfo}>
          <div className="personal-info-title-container">
            <h2>Personal Information</h2>

            {!editInfo && (
              <span
                className="material-symbols-outlined"
                onClick={handleEditClick}
              >
                edit
              </span>
            )}
          </div>

          <div className="form-group">
            <label>First Name</label>
            {editInfo ? (
              <input type="text" placeholder={userData.first_name} />
            ) : (
              <div className="info">
                <>{userData.first_name}</>
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Last Name</label>
            {editInfo ? (
              <input type="text" placeholder={userData.last_name} />
            ) : (
              <div className="info">
                <>{userData.last_name}</>
              </div>
            )}
          </div>
          <div className="form-group">
            <label>Email</label>
            {editInfo ? (
              <input type="text" placeholder={userData.email} />
            ) : (
              <div className="info">
                <>{userData.email}</>
              </div>
            )}
          </div>
          <div className="form-group">
            <label>Phone</label>
            {editInfo ? (
              <input
                type="text"
                placeholder={`(${userData.phone.slice(
                  0,
                  3
                )}) ${userData.phone.slice(3, 6)}-${userData.phone.slice(6)}`}
              />
            ) : (
              <div className="info">
                <>{`(${userData.phone.slice(0, 3)}) ${userData.phone.slice(
                  3,
                  6
                )}-${userData.phone.slice(6)}`}</>
              </div>
            )}
          </div>
          <div className="form-group">
            <label>Job Title</label>
            {editInfo ? (
              <input type="text" placeholder={userData.job_title} />
            ) : (
              <div className="info">
                <>{userData.job_title}</>
              </div>
            )}
          </div>
          <div className="buttons-container">
            <button
              className={`save-updates-button ${editInfo ? "update" : ""}`}
            >
              Save Updates
            </button>
            {editInfo && (
              <button className="cancel-button" onClick={handleCancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>
        <div className="edit-photo">
          <div className="profile-pic-container">
            <img className="photo" src={userData.profile_pic} alt="profile" />
          </div>
          <button className="change-photo-button" onClick={handleEditPhoto}>
            Change Photo
          </button>
          {isDemo && (
            <div className="contact-buttons">
              <Link to="https://docs.google.com/document/d/1gmhHDax9uPWlIcE3hUXCTqwETpdOIjiL6Zk98VdyFTI/edit?usp=sharing">
                <span className="material-symbols-outlined">description</span>
              </Link>
              <a href="mailto:jacksonrkalmbach@gmail.com">
                <span className="material-symbols-outlined">mail</span>
              </a>
              <Link to="https://www.linkedin.com/in/jacksonkalmbach/">
                <span className="material-symbols-outlined">person</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
