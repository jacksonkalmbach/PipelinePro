import React from "react";
import { useSelector } from "react-redux";

import "./ConfirmDelete.styles.scss";

const ConfirmDelete = () => {
  const selectedLeads = useSelector(
    (state: any) => state.selectAllLeads.selectedLeads
  );

  const deleteSelectedLeads = () => {
    selectedLeads.forEach((leadId: string) => {
      console.log("leadID type", typeof leadId);
      confirmDeleteLead(leadId);
    });
  };

  const confirmDeleteLead = (leadId: string) => {
    try {
      fetch(`http://localhost:5001/leads/${leadId}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    } catch (error) {
      console.log("error deleting lead", error);
    }
  };

  return (
    <div className="confirm-delete-lead">
      <div className="are-you-sure">
        <h3>Are you sure you want to delete this lead?</h3>
        <p>You will not be able to undo this action.</p>
      </div>
      <div className="confirm-delete-lead-buttons">
        <button className="delete-lead-btn" onClick={deleteSelectedLeads}>
          Delete
        </button>
        <button className="cancel-delete-btn" onClick={() => "cancel"}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
