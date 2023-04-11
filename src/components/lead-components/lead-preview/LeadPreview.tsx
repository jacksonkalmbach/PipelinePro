import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setShowLeadPreview } from "../../../store/reducers/leads/showLeadSlice";

import "./LeadPreview.styles.scss";

const LeadPreview = () => {
  const dispatch = useDispatch();
  const previewLead = useSelector((state: any) => state.showLead.previewLead);
  const leadId = useSelector((state: any) => state.showLead.previewId);

  const handleCloseLeadPreview = () => {
    dispatch(setShowLeadPreview(false));
  };

  return (
    previewLead && (
      <>
        <div className={previewLead ? "overlay" : ""}></div>
        <div className="lead-preview-container">
          <div className="lead-preview-buttons-container">
            <div
              className="back-to-leads-button"
              onClick={handleCloseLeadPreview}
            >
              <span className="material-symbols-outlined">first_page</span>
              Back to leads
            </div>
            <Link
              to={`/contacts/leads/${leadId}`}
              className="full-lead-details-button"
              onClick={handleCloseLeadPreview}
            >
              View full details
              <span className="material-symbols-outlined">arrow_right_alt</span>
            </Link>
          </div>
          LeadPreview {leadId}
        </div>
      </>
    )
  );
};

export default LeadPreview;
