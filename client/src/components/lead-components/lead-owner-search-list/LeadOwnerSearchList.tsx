import React from "react";

import EmployeeSelect from "../../employee-components/employee-select/EmployeeSelect";

import "./LeadOwnerSearchList.styles.scss";

interface LeadOwnerSearchListProps {
  employees: {
    id: string;
    first_name: string;
    last_name: string;
    photo_url: string;
    email: string;
    phone: string;
    department: string;
    job_title: string;
  }[];
  type?: string;
  onEmployeeSelected?: (
    employee_id: string,
    first_name: string,
    last_name: string,
    profile_pic: string
  ) => void;
}

const LeadOwnerSearchList = ({
  employees,
  onEmployeeSelected,
}: LeadOwnerSearchListProps) => {
  return (
    <div className="lead-owner-search-list-container">
      {employees.map((employee) => {
        const { id, first_name, last_name, photo_url } = employee;
        return (
          <div className="employee-option">
            <EmployeeSelect
              key={id}
              id={id}
              firstName={first_name}
              lastName={last_name}
              profilePic={photo_url}
              onEmployeeSelected={onEmployeeSelected}
            />
          </div>
        );
      })}
    </div>
  );
};

export default LeadOwnerSearchList;
