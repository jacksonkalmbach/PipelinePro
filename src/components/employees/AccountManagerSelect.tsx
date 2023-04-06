import React from "react";

import "./AccountManagerSelect.styles.scss";

interface AccoutManagerSelectProps {
  firstName: string;
  lastName: string;
  profilePic: string;
  nav?: boolean;
}

const AccoutManagerSelect = ({
  firstName,
  lastName,
  profilePic,
  nav,
}: AccoutManagerSelectProps) => {
  return (
    <div className="ae-select-container">
      <div className="profile-pic-container">
        <img src={profilePic} alt="profile" />
      </div>
      <div className={`ae-fullname ${nav ? "nav" : ""}`}>
        {firstName} {lastName}
      </div>
    </div>
  );
};

export default AccoutManagerSelect;
