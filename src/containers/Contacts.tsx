import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setContactsNavigation } from "../store/reducers/navigation/contactsNavigationSlice";

import "./Contacts.styles.scss";

const Contacts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState(0);

  useEffect(() => {
    navigate("/contacts/leads");
  }, []);

  const handleSelected = (index: number, value: string) => {
    setSelectedSection(index);
    dispatch(setContactsNavigation(value));
  };

  return (
    <div className="contacts-container">
      <div className="contacts-sections">
        <div
          className={`contacts-section ${
            selectedSection === 0 ? "selected" : ""
          }`}
          onClick={() => handleSelected(0, "Leads")}
        >
          <Link to="/contacts/leads" className="link">
            Leads
          </Link>
        </div>
        <div
          className={`contacts-section ${
            selectedSection === 1 ? "selected" : ""
          }`}
          onClick={() => handleSelected(1, "Contacts")}
        >
          <Link to="/contacts/contacts" className="link">
            Contacts
          </Link>
        </div>
        <div
          className={`contacts-section ${
            selectedSection === 2 ? "selected" : ""
          }`}
          onClick={() => handleSelected(2, "Company")}
        >
          <Link to="/contacts/companies" className="link">
            Company
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
