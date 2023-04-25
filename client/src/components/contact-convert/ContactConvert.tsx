import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { showConfirmDelete } from "../../store/reducers/leads/showLeadSlice";

import {
  setSelectAllLeads,
} from "../../store/reducers/leads/selectAllLeadsSlice";

import "./ContactConvert.styles.scss";
import ConfirmDelete from "../lead-components/confirm-delete/ConfirmDelete";

const ContactConvert = () => {
  const dispatch = useDispatch();
  const selectedLeads = useSelector(
    (state: any) => state.selectAllLeads.selectedLeads
  );

  const displayConfirmDelete = useSelector(
    (state: any) => state.showLead.confirmDelete
  );

  const handleDeleteLead = () => {
    dispatch(showConfirmDelete(true));
  };

  const handleConvertToContact = () => {
    console.log("Convert to contact");
  };

  const handleUnselectAll = () => {
    dispatch(setSelectAllLeads(false));
  };

  return (
    <>
      {displayConfirmDelete && <ConfirmDelete />}
      <div className="contact-convert-container">
        <p>
          {selectedLeads.length}{" "}
          {selectedLeads.length === 1 ? "Item Selected" : "Items Selected"}
        </p>
        <p className="unselect" onClick={handleUnselectAll}>
          Unselect All
        </p>
        <p className="add-to-contacts" onClick={handleConvertToContact}>
          <span className="material-symbols-outlined">person_add</span>Convert
          to Contact
        </p>
        <div className="vertical-line"></div>
        <p className="delete-lead" onClick={handleDeleteLead}>
          <span className="material-symbols-outlined">delete</span>Delete
        </p>
      </div>
    </>
  );
};

export default ContactConvert;
