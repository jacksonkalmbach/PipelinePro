import React from "react";

import "./EmployeeSelect.styles.scss";

interface EmployeeSelectProps {
  id?: string | null;
  firstName: string;
  lastName: string;
  profilePic?: string;
  title?: string;
  nav?: boolean;
  onEmployeeSelected?: (
    ownerId: string,
    ownerFirstName: string,
    ownerLastName: string,
    ownerProfilePic: string
  ) => void;
}

const EmployeeSelect = ({
  id,
  firstName,
  lastName,
  profilePic,
  title,
  nav,
  onEmployeeSelected,
}: EmployeeSelectProps) => {
  const handleSelected = () => {
    onEmployeeSelected &&
      onEmployeeSelected(
        id?.toString() || "",
        firstName,
        lastName,
        profilePic || ""
      );
  };

  return (
    <div className="employee-select-container" onClick={handleSelected}>
      <div className="profile-pic-container">
        {profilePic !== "" ? (
          <img src={profilePic} alt="profile" />
        ) : (
          <div className="profile-pic-initials">
            {firstName[0] + lastName[0]}
          </div>
        )}
      </div>
      <div className="employee-details">
        <>
          <div className={`fullname ${nav ? "nav" : ""}`}>
            {firstName} {lastName}
          </div>
        </>
        {nav ? <div className="employee-title">{title}</div> : <></>}
      </div>
    </div>
  );
};

export default EmployeeSelect;
