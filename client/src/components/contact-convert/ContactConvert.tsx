import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setDeleteType,
  showConfirmDelete,
  showEditLead,
} from "../../store/reducers/leads/showLeadSlice";

import { setSelectAllLeads } from "../../store/reducers/leads/selectAllLeadsSlice";

import "./ContactConvert.styles.scss";
import ConfirmDelete from "../lead-components/confirm-delete/ConfirmDelete";
import EditLead from "../lead-components/edit-lead/EditLead";

const defaultLeadData = {
  lead_id: "",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  company: "",
  job_title: "",
  lead_owner: "",
  lead_status: "",
  lead_owner_first_name: "",
  lead_owner_last_name: "",
  lead_owner_photo_url: "",
};

interface Lead {
  lead_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company: string;
  job_title: string;
  lead_owner: string;
  lead_status: string;
  lead_owner_first_name: string;
  lead_owner_last_name: string;
  lead_owner_photo_url: string;
}

const ContactConvert = () => {
  const dispatch = useDispatch();
  const selectedLeads = useSelector(
    (state: any) => state.selectAllLeads.selectedLeads
  );
  const [leadData, setLeadData] = useState<Lead>(defaultLeadData);

  const displayConfirmDelete = useSelector(
    (state: any) => state.showLead.confirmDelete
  );

  const displayEditLead = useSelector((state: any) => state.showLead.editLead);

  const handleDeleteLead = () => {
    dispatch(showConfirmDelete(true));
    dispatch(setDeleteType("lead"));
  };

  const handleConvertToContact = () => {
    console.log("Convert to contact");
  };

  const handleUnselect = () => {
    dispatch(setSelectAllLeads(false));
  };

  const handleEditLead = () => {
    dispatch(showEditLead(true));
  };

  useEffect(() => {
    if (selectedLeads.length === 1) {
      try {
        fetch(`http://localhost:5001/leads/${selectedLeads[0].toString()}`)
          .then((res) => res.json())
          .then((data) => {
            setLeadData(data);
          });
        fetch(`http://localhost:5001/employees/${leadData.lead_owner}`)
          .then((res) => res.json())
          .then((data) => {
            setLeadData((prevState) => ({
              ...prevState,
              lead_owner_first_name: data.first_name,
              lead_owner_last_name: data.last_name,
              lead_owner_photo_url: data.profile_pic,
            }));
          });
      } catch (error) {
        console.log("Error in ContactConvert.tsx useEffect", error);
      }
    }
  }, [selectedLeads, leadData.lead_owner]);

  return (
    <>
      {displayConfirmDelete && <ConfirmDelete />}
      {displayEditLead && (
        <EditLead
          id={leadData.lead_id}
          firstName={leadData.first_name}
          lastName={leadData.last_name}
          email={leadData.email}
          phone={leadData.phone}
          company={leadData.company}
          jobTitle={leadData.job_title}
          leadOwner={leadData.lead_owner}
          leadOwnerFirstName={leadData.lead_owner_first_name}
          leadOwnerLastName={leadData.lead_owner_last_name}
          leadOwnerPhotoURL={leadData.lead_owner_photo_url}
          leadStatus={leadData.lead_status}
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
          <span className="material-symbols-outlined">person_add</span>
          {selectedLeads.length === 1
            ? "Convert to Contact"
            : "Convert to Contacts"}
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
