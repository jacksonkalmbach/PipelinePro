import React, { useState, useEffect } from "react";

import "./LeadRowStatus.styles.scss";

interface LeadRowStatusProps {
  status: string;
  clickable?: boolean;
  selected?: boolean | undefined;
  onClick?: () => void;
}

const LeadRowStatus = ({
  status,
  clickable,
  onClick,
  selected,
}: LeadRowStatusProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    if (selected !== undefined) {
      setIsSelected(selected);
    } else {
      setIsSelected(false);
    }
  }, [selected]);

  const handleClick = () => {
    if (onClick) {
      onClick();
      setIsSelected(!isSelected);
    }
  };

  return (
    <div
      className={`lead-row-status-container ${status.toLowerCase()} ${
        clickable ? "clickable" : ""
      } ${isSelected && clickable ? "selected" : ""}`}
      onClick={handleClick}
    >
      {status}
    </div>
  );
};

export default LeadRowStatus;
