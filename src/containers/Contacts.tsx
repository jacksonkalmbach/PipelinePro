import React, { useState } from "react";

import "./Contacts.styles.scss";

const Contacts = () => {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelected = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div className="contacts-container">
      <div className="contacts-sections">
        <div
          className={`contacts-section ${isSelected ? "selected" : ""}`}
          onClick={handleSelected}
        >
          Leads
        </div>
        <div
          className={`contacts-section ${isSelected ? "selected" : ""}`}
          onClick={handleSelected}
        >
          Contacts
        </div>
        <div
          className={`contacts-section ${isSelected ? "selected" : ""}`}
          onClick={handleSelected}
        >
          Company
        </div>
      </div>
    </div>
  );
};

export default Contacts;
