import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  unSelectAllLeads,
  setSelectAllLeads,
} from "../../store/reducers/leads/selectAllLeadsSlice";

import "./ContactConvert.styles.scss";

const ContactConvert = () => {
  const dispatch = useDispatch();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const selectedLeads = useSelector(
    (state: any) => state.selectAllLeads.selectedLeads
  );

  const handleDeleteLead = () => {
    setShowConfirmDelete(true);
    // try {
    //   fetch(`http://localhost:5001/leads/`, {
    //     method: "DELETE",
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       console.log(data);
    //     });
    //   // socket.emit("delete lead", leadId);
    // } catch (error) {
    //   console.log("error deleting lead", error);
    // }
  };

  const handleConvertToContact = () => {
    console.log("Convert to contact");
  };

  const handleUnselectAll = () => {
    dispatch(unSelectAllLeads(true));
    dispatch(setSelectAllLeads(false));
  };

  return (
    <>
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
