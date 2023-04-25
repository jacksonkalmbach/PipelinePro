import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSelectedLeads } from "../../../store/reducers/leads/selectAllLeadsSlice";
import {
  setShowLeadPreview,
  showConfirmDelete,
} from "../../../store/reducers/leads/showLeadSlice";

import "./ConfirmDelete.styles.scss";

interface ConfirmDeleteProps {
  selectedId?: string;
}

const ConfirmDelete = ({ selectedId }: ConfirmDeleteProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedId) {
      dispatch(addSelectedLeads(selectedId));
    }
  }, [selectedId, dispatch]);

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
      dispatch(showConfirmDelete(false));
      dispatch(setShowLeadPreview(false));
    } catch (error) {
      console.log("error deleting lead", error);
    }
  };

  const cancelDelete = () => {
    dispatch(showConfirmDelete(false));
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
        <button className="cancel-delete-btn" onClick={cancelDelete}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
