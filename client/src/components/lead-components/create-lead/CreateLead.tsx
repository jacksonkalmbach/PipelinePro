import React, { useState, useEffect } from "react";

import "./CreateLead.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { setShowCreateLead } from "../../../store/reducers/leads/showLeadSlice";
import LeadRowStatus from "../lead-list-components/lead-row-status/LeadRowStatus";
import EmployeeSelect from "../../employee-components/employee-select/EmployeeSelect";
import SearchBox from "../../search-box-component/SearchBox";

import socket from "../../../utils/socket";
import LeadOwnerSearchList from "../lead-owner-search-list/LeadOwnerSearchList";

const defaultCreateLeadState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  jobTitle: "",
  leadStatus: "",
  leadOwner: "",
};

interface Employee {
  employee_id: number;
  first_name: string;
  last_name: string;
  profile_pic: string;
  email: string;
  phone: string;
  department: string;
  job_title: string;
}

const defaultLeadOwner = {
  employee_id: 0,
  first_name: "",
  last_name: "",
  profile_pic: "",
};

interface selectedLeadOwner {
  employee_id: number;
  first_name: string;
  last_name: string;
  profile_pic: string;
}

const CreateLead = () => {
  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState(defaultCreateLeadState);
  const { leadStatus } = formFields;
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedLeadOwner, setSelectedLeadOwner] =
    useState<selectedLeadOwner>(defaultLeadOwner);

  useEffect(() => {
    try {
      fetch("http://localhost:5001/employees/department/Sales")
        .then((res) => res.json())
        .then((data) => {
          setEmployees(data);
        });
    } catch (error) {
      console.log("error fetching owners in create lead", error);
    }
  }, []);

  const [searchField, setSearchField] = useState("");
  const [filteredEmployees, setFilteredEmployees] =
    useState<Employee[]>(employees);
  const [createLeadSuccess, setCreateLeadSuccess] = useState(false);

  useEffect(() => {
    const newFilteredEmployees = employees.filter((employee) => {
      return (
        (employee.first_name &&
          employee.first_name.toLocaleLowerCase().includes(searchField)) ||
        (employee.last_name &&
          employee.last_name.toLocaleLowerCase().includes(searchField))
      );
    });

    setFilteredEmployees(newFilteredEmployees);
  }, [searchField, employees]);

  const onSearchChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };

  const onEmployeeSelect = (
    ownerId: string,
    firstName: string,
    lastName: string,
    profilePic: string
  ) => {
    setSelectedLeadOwner({
      employee_id: Number(ownerId),
      first_name: firstName,
      last_name: lastName,
      profile_pic: profilePic,
    });
    setFormFields({ ...formFields, leadOwner: ownerId });
  };

  const handleClearLeadOwner = () => {
    setFormFields({ ...formFields, leadOwner: "" });
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleLeadStatusChange = (status: string): void => {
    setFormFields({ ...formFields, leadStatus: status });
  };

  const showCreateLead = useSelector((state: any) => state.showLead.value);

  const handleCloseCreateLead = () => {
    dispatch(setShowCreateLead(false));
  };

  const resetFormFields = () => {
    setFormFields(defaultCreateLeadState);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const body = { ...formFields };
      const response = fetch("http://localhost:5001/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);
      resetFormFields();
      setCreateLeadSuccess(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {showCreateLead && (
        <>
          <div className={showCreateLead ? "overlay" : ""}></div>
          <div className={"create-lead-container"}>
            <div className="create-lead-header">
              <h1>Create Lead </h1>
              <div
                className="close-create-lead-button"
                onClick={handleCloseCreateLead}
              >
                Close
                <span className="material-symbols-outlined">close</span>
              </div>
            </div>

            {createLeadSuccess ? (
              <div className="create-success">
                <div className="lead-create-success">
                  <div className="material-symbols-border animate">
                    <span className="material-symbols-outlined">
                      check_circle
                    </span>
                  </div>
                  Lead Created!
                  <button
                    className="create-another-lead-button"
                    onClick={() => setCreateLeadSuccess(false)}
                  >
                    Create another lead
                  </button>
                </div>
              </div>
            ) : (
              <>
                <form className="create-lead-form" onSubmit={handleSubmit}>
                  <div className="lead-name">
                    <div className="form-group">
                      First Name
                      <input
                        className="first-name-input"
                        required
                        type="text"
                        id="firstName-input"
                        name="firstName"
                        placeholder="e.g. John"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      Last Name
                      <input
                        className="last-name-input"
                        required
                        type="text"
                        id="lastName-input"
                        name="lastName"
                        placeholder="e.g. Doe"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    Email
                    <input
                      type="email"
                      id="email-input"
                      name="email"
                      placeholder="e.g. mail@example.com"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    Phone
                    <input
                      type="tel"
                      id="phone-input"
                      name="phone"
                      maxLength={10}
                      placeholder="Enter Number"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    Company
                    <input
                      type="text"
                      id="company-input"
                      name="company"
                      placeholder="e.g. Google"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    Job Title
                    <input
                      type="text"
                      id="jobTitle-input"
                      name="jobTitle"
                      placeholder="e.g. Project Manager"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    Lead Owner
                    {formFields.leadOwner.length ? (
                      <>
                        <div className="selected-lead-owner">
                          <EmployeeSelect
                            id={selectedLeadOwner.employee_id}
                            firstName={selectedLeadOwner.first_name}
                            lastName={selectedLeadOwner.last_name}
                            profilePic={selectedLeadOwner.profile_pic}
                          />
                          <span
                            className="material-symbols-outlined"
                            onClick={handleClearLeadOwner}
                          >
                            close
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <SearchBox
                          className="seach-box"
                          placeholder="Search Lead Owners"
                          name="leadOwner"
                          onChangeHandler={onSearchChange}
                        />
                        {searchField.length > 0 &&
                          employees &&
                          !formFields.leadOwner.length && (
                            <LeadOwnerSearchList
                              employees={filteredEmployees}
                              onEmployeeSelected={onEmployeeSelect}
                            />
                          )}
                      </>
                    )}
                  </div>
                  <div>
                    Lead Status
                    <div className="lead-progress">
                      <LeadRowStatus
                        status="New"
                        clickable={true}
                        onClick={() => handleLeadStatusChange("New")}
                        selected={leadStatus === "New" ? true : false}
                      />
                      <LeadRowStatus
                        status="Open"
                        clickable={true}
                        onClick={() => handleLeadStatusChange("Open")}
                        selected={leadStatus === "Open" ? true : false}
                      />
                      <LeadRowStatus
                        status="In Progress"
                        clickable={true}
                        onClick={() => handleLeadStatusChange("In Progress")}
                        selected={leadStatus === "In Progress" ? true : false}
                      />
                      <LeadRowStatus
                        status="Warm"
                        clickable={true}
                        onClick={() => handleLeadStatusChange("Warm")}
                        selected={leadStatus === "Warm" ? true : false}
                      />
                      <LeadRowStatus
                        status="Closed"
                        clickable={true}
                        onClick={() => handleLeadStatusChange("Closed")}
                        selected={leadStatus === "Closed" ? true : false}
                      />
                    </div>
                  </div>
                  <div className="create-lead-button-container">
                    <button
                      className="create-lead-button"
                      type="submit"
                      name="action"
                      value="create-lead"
                    >
                      Create Lead
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default CreateLead;
