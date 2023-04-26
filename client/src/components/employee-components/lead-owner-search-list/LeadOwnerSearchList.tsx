import React from "react";

import EmployeeSelect from "../employee-select/EmployeeSelect";

import "./LeadOwnerSearchList.styles.scss";

interface LeadOwnerSearchListProps {
  employees: {
    employee_id: number;
    first_name: string;
    last_name: string;
    profile_pic: string;
    email: string;
    phone: string;
    department: string;
    job_title: string;
  }[];
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
        const { employee_id, first_name, last_name, profile_pic } = employee;
        return (
          <div className="employee-option">
            <EmployeeSelect
              id={employee_id}
              key={employee_id}
              firstName={first_name}
              lastName={last_name}
              profilePic={profile_pic}
              onEmployeeSelected={onEmployeeSelected}
            />
          </div>
        );
      })}
    </div>
  );
};

export default LeadOwnerSearchList;
