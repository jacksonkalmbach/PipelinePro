import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setContactsNavigation } from "../../store/reducers/navigation/contactsNavigationSlice";

import "./Contacts.styles.scss";
import SectionNavbar from "../subsection-navbar/SectionNavbar";

const Contacts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState(0);
  const [hasMounted, sethasMounted] = useState(false);

  useEffect(() => {
    if (!hasMounted) {
      navigate("/contacts/leads");
      sethasMounted(true);
    }
  }, [hasMounted, navigate]);

  const handleSelected = (index: number, value: string) => {
    setSelectedSection(index);
    dispatch(setContactsNavigation(value));
  };

  return (
    <div className="contacts-container">
      <SectionNavbar
        section={"contacts"}
        sectionTitles={["Leads, Contacts, Company"]}
      />
      
    </div>
  );
};

export default Contacts;
