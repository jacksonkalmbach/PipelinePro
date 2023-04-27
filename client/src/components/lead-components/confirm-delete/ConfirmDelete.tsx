import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addSelectedLeads,
  removeSelectedLeads,
} from "../../../store/reducers/leads/selectAllLeadsSlice";
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
  const deleteType = useSelector((state: any) => state.showLead.deleteType);

  console.log("deleteType - CONFIRM DELETE", deleteType);

  const selectedLeads = useSelector(
    (state: any) => state.selectAllLeads.selectedLeads
  );

  const deleteId = useSelector((state: any) => state.showLead.deleteId);
  console.log("deleteId - CONFIRM DELETE", deleteId);

  const deleteSelectedLead = () => {
    confirmDeleteLead(selectedId!);
  };

  const deleteSelectedLeads = () => {
    selectedLeads.forEach((leadId: string) => {
      confirmDeleteLead(leadId);
    });
  };

  const confirmDeleteLead = (id: string) => {
    try {
      if (deleteType === "lead") {
        fetch(`http://localhost:5001/leads/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
        dispatch(setShowLeadPreview(false));
        dispatch(removeSelectedLeads(id));
      } else if (deleteType === "note") {
        fetch(`http://localhost:5001/notes/${deleteId}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
      } else {
        console.log("delete");
      }
      dispatch(showConfirmDelete(false));
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
        <h3>Are you sure?</h3>
        <p>You will not be able to undo this action.</p>
      </div>
      <div className="confirm-delete-lead-buttons">
        <button
          className="delete-lead-btn"
          onClick={selectedId ? deleteSelectedLead : deleteSelectedLeads}
        >
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
