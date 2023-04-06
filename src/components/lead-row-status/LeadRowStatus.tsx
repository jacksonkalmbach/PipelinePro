import React from "react";

import "./LeadRowStatus.styles.scss";

interface LeadRowStatusProps {
  status: string;
}

const LeadRowStatus = ({ status }: LeadRowStatusProps) => {
  return (
    <div className={`lead-row-staus-container ${status.toLowerCase()}`}>
      {status}
    </div>
  );
};

export default LeadRowStatus;
