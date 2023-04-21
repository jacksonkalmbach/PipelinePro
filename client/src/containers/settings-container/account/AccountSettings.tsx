import React from "react";

import "./AccountSettings.styles.scss";

const AccountSettings = () => {
  return (
    <div className="account-settings-container">
      <div className="account-settings-content">
        <h2>Account Information</h2>
        <input type="text" placeholder="First Name" />
        <input type="text" placeholder="Last Name" />
        <input type="text" placeholder="Email" />
        <input type="text" placeholder="Phone Number" />
        <input type="text" placeholder="Company Name" />
      </div>
      <div className="account-photo-container"></div>
    </div>
  );
};

export default AccountSettings;
