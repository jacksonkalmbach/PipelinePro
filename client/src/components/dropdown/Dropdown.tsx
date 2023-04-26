import React, { useState } from "react";
import "./Dropdown.styles.scss";

interface DropdownProps {
  title: string | number;
  options: (string | number | React.ReactNode)[];
  moreFilters?: boolean;
  numberFilter?: boolean;
  type?: string;
}

const Dropdown = ({
  title,
  options,
  moreFilters,
  numberFilter,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | number>("");

  console.log("Dropdown: ", options);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string | number) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      {numberFilter ? (
        <div className="dropdown-toggle" onClick={toggleDropdown}>
          {!moreFilters ? (
            <span
              className={`material-symbols-outlined ${isOpen ? "flipped" : ""}`}
            >
              expand_more
            </span>
          ) : (
            <span className="material-symbols-outlined">filter_list</span>
          )}
          {selectedOption || title}
        </div>
      ) : (
        <div className="dropdown-toggle" onClick={toggleDropdown}>
          {selectedOption || title}
          {!moreFilters ? (
            <span
              className={`material-symbols-outlined ${isOpen ? "flipped" : ""}`}
            >
              expand_more
            </span>
          ) : (
            <span className="material-symbols-outlined">filter_list</span>
          )}
        </div>
      )}
      <ul className={`dropdown-menu ${isOpen ? "show" : ""}`}>
        {options.map((option) => (
          <li>{option}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
