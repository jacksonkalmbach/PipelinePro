import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

interface SectionNavbarProps {
  section: string;
  sectionTitles: string[];
}

const SectionNavbar = ({ section, sectionTitles }: SectionNavbarProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState(0);
  const [hasMounted, sethasMounted] = useState(false);

  useEffect(() => {
    if (!hasMounted) {
      navigate(`${section}`);
      sethasMounted(true);
    }
  }, [hasMounted, navigate]);

  const handleSelected = (index: number, value: string) => {
    setSelectedSection(index);
    // dispatch(setContactsNavigation(value));
  };

  return (
    <>
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
          <Link to="/contacts/company" className="link">
            Company
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default SectionNavbar;
