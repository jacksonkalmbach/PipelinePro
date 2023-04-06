import React, { useState } from "react";

import "./LeadRowStatus.styles.scss";

interface LeadRowStatusProps {
  status: string;
  clickable?: boolean;
}

const LeadRowStatus = ({ status, clickable }: LeadRowStatusProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const toggleSelected = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div
      className={`lead-row-status-container ${status.toLowerCase()} ${
        clickable ? "clickable" : ""
      } ${isSelected && clickable ? "selected" : ""}`}
      onClick={toggleSelected}
    >
      {status}
    </div>
  );
};

export default LeadRowStatus;
