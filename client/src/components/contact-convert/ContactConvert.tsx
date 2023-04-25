import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  showConfirmDelete,
  showEditLead,
} from "../../store/reducers/leads/showLeadSlice";

import { setSelectAllLeads } from "../../store/reducers/leads/selectAllLeadsSlice";

import "./ContactConvert.styles.scss";
import ConfirmDelete from "../lead-components/confirm-delete/ConfirmDelete";
import EditLead from "../lead-components/edit-lead/EditLead";

const ContactConvert = () => {
  const dispatch = useDispatch();
  const selectedLeads = useSelector(
    (state: any) => state.selectAllLeads.selectedLeads
  );

  const displayConfirmDelete = useSelector(
    (state: any) => state.showLead.confirmDelete
  );

  const displayEditLead = useSelector((state: any) => state.showLead.editLead);

  const handleDeleteLead = () => {
    dispatch(showConfirmDelete(true));
  };

  const handleConvertToContact = () => {
    console.log("Convert to contact");
  };

  const handleUnselect = () => {
    console.log("Unselect");
    dispatch(setSelectAllLeads(false));
  };

  const handleEditLead = () => {
    dispatch(showEditLead(true));
  };

  return (
    <>
      {displayConfirmDelete && <ConfirmDelete />}
      {displayEditLead && (
        <EditLead
          id={1}
          firstName={"FirstName"}
          lastName={"LastName"}
          email={"Email"}
          phone={"Phone"}
          company={"company"}
          jobTitle={"JobTitle"}
          leadOwner={1}
          leadStatus={"LeadStatus"}
        />
      )}
      <div className="contact-convert-container">
        <p>
          {selectedLeads.length}{" "}
          {selectedLeads.length === 1 ? "Item Selected" : "Items Selected"}
        </p>
        <div className="vertical-line"></div>
        <p className="unselect" onClick={handleUnselect}>
          {selectedLeads.length === 1 ? "Unselect" : "Unselect All"}
        </p>
        <div className="vertical-line"></div>
        {selectedLeads.length === 1 && (
          <>
            <p className="edit-lead" onClick={handleEditLead}>
              <span className="material-symbols-outlined">edit</span>Edit Lead
            </p>
            <div className="vertical-line"></div>
          </>
        )}
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
