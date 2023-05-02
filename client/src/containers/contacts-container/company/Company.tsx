import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import LeadList from "../../../components/lead-components/lead-list-components/list/List";

import "./Company.styles.scss";

interface CompanyData {
  company_name: string;
  address: string;
  logo?: string;
  phone: string;
  website: string;
}

const defaultCompanyData: CompanyData = {
  company_name: "",
  address: "",
  logo: "",
  phone: "",
  website: "",
};

interface EmployeeData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  job_title: string;
  department: string;
  photo_url?: string;
}

const defaultEmployeeData: EmployeeData = {
  id: "",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  job_title: "",
  department: "",
  photo_url: "",
};

const Company = () => {
  const companyId = useSelector((state: any) => state.userAuth.companyId);
  console.log("companyId", companyId);
  const [company, setCompany] = useState<CompanyData>(defaultCompanyData);
  const [employees, setEmployees] = useState<EmployeeData[]>([
    defaultEmployeeData,
  ]);

  useEffect(() => {
    try {
      fetch(`http://localhost:5001/company/${companyId}`)
        .then((res) => res.json())
        .then((data) => setCompany(data));
    } catch (error) {}
  }, [companyId]);

  useEffect(() => {
    try {
      fetch(`http://localhost:5001/users/company/${companyId}`)
        .then((res) => res.json())
        .then((data) => setEmployees(data));
    } catch (error) {}
  }, [companyId]);

  return (
    <div className="company-conatiner">
      <div className="company-header">
        <div className="company-header__logo">
          <img src="" alt="" />
        </div>
        <div className="company-header__info">
          <div className="company-header__info--name">
            <h1>
              {company.company_name !== ""
                ? company.company_name
                : "Loading..."}
            </h1>
          </div>
          <div className="company-header__info--location">
            <h3>{company.address}</h3>
          </div>
          <div className="company-header__info--phone">
            <h3>{company.phone}</h3>
          </div>
          <div className="company-header__info--website">
            <h3>{company.website}</h3>
          </div>
        </div>
      </div>
      <div className="company-body">
        <div className="company-body__employees">
          <h1>Employees</h1>
          <div className="company-body__employees--list-container">
            <LeadList
              leads={employees}
              type="employees"
              searchPlaceholder="Search Employees"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Company;
