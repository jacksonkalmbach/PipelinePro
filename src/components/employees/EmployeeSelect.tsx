import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSectionNavigation } from "../../store/reducers/navigation/sectionNavigationSlice";

import "./EmployeeSelect.styles.scss";

interface AccoutManagerSelectProps {
  id: number;
  firstName: string;
  lastName: string;
  profilePic: string;
  title?: string;
  nav?: boolean;
}

const AccoutManagerSelect = ({
  id,
  firstName,
  lastName,
  profilePic,
  title,
  nav,
}: AccoutManagerSelectProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fullName = firstName + " " + lastName;

  const handleClick = () => {
    if (nav) {
      navigate(`contacts/company/employees/${id}`);
      dispatch(setSectionNavigation(fullName));
    }
    console.log("Employee #: " + id + " clicked");
  };

  return (
    <div className="employee-select-container" onClick={handleClick}>
      <div className="profile-pic-container">
        {profilePic.length > 2 ? (
          <img src={profilePic} alt="profile" />
        ) : (
          <div className="profile-pic-initials">
            {firstName[0] + lastName[0]}
          </div>
        )}
      </div>
      <div className="employee-details">
        <div className={`fullname ${nav ? "nav" : ""}`}>
          {firstName} {lastName}
        </div>
        {nav ? <div className="employee-title">{title}</div> : <></>}
      </div>
    </div>
  );
};

export default AccoutManagerSelect;
