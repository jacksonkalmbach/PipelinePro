import React from "react";
import SubSectionNavbar from "../../components/navigation-components/subsection-navbar/SubsectionNavbar";

import "./Settings.styles.scss";

const Settings = () => {
  return (
    <div className="settings-container">
      <SubSectionNavbar title={"Settings"} options={["Account"]} />
    </div>
  );
};

export default Settings;
