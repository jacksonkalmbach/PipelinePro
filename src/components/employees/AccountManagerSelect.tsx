import React from "react";

import "./AccountManagerSelect.styles.scss";

interface AccoutManagerSelectProps {
  firstName: string;
  lastName: string;
  profilePic: string;
}

const AccoutManagerSelect = ({
  firstName,
  lastName,
  profilePic,
}: AccoutManagerSelectProps) => {
  return (
    <div className="ae-select-container">
      <div className="profile-pic-container">
        <img src={profilePic} alt="profile" />
      </div>
      <div className="ae-fullname">
        {firstName} {lastName}
      </div>
    </div>
  );
};

export default AccoutManagerSelect;