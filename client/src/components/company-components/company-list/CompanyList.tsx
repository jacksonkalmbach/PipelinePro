import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedCompanyName,
  setSelectedCompanyId,
  setShowCompanyList,
} from "../../../store/reducers/leads/showLeadSlice";
import SearchBox from "../../search-box-component/SearchBox";

import "./CompanyList.styles.scss";

interface CompanyData {
  id: string;
  company_name: string;
  address: string;
  phone: string;
  website: string;
}

const defaultCompanyData = {
  id: "",
  company_name: "",
  address: "",
  phone: "",
  website: "",
};

const CompanyList = () => {
  const dispatch = useDispatch();

  const displayCompanyList = useSelector(
    (state: any) => state.showLead.showCompanyList
  );

  const [companies, setCompanies] = useState<CompanyData[]>([
    defaultCompanyData,
  ]);

  const handleCompanyClick = async (
    name: string,
    id: string
  ): Promise<void> => {
    await dispatch(setSelectedCompanyName(name));
    await dispatch(setSelectedCompanyId(id));
    dispatch(setShowCompanyList(false));
  };

  const companyList = [];

  for (let i = 0; i < companies.length; i++) {
    companyList.push(
      <span
        className="company"
        key={companies[i].id}
        onClick={() =>
          handleCompanyClick(companies[i].company_name, companies[i].id)
        }
      >
        <p className="info-item">{companies[i].company_name}</p>
        <p className="info-item">{companies[i].website}</p>
        <p className="info-item">City, ST</p>
      </span>
    );
  }

  useEffect(() => {
    try {
      fetch("http://localhost:5001/company")
        .then((res) => res.json())
        .then((data) => setCompanies(data));
    } catch (error) {
      console.log("Error fetching companies - CompanyList.tsx", error);
    }
  }, []);

  return (
    <>
      {displayCompanyList && (
        <>
          <div className="company-list-container">
            <div className="search-add-company">
              <div className="search-box-container">
                <SearchBox
                  className="search-box"
                  placeholder="Search Companies"
                  onChangeHandler={() => {}}
                />
              </div>
              <div className="button-container">
                <button className="add-company-button">Add Company</button>
              </div>
            </div>
            <div className="company-list-header">
              <div className="company-list-title">Company Name</div>
              <div className="company-list-title">Website</div>
              <div className="company-list-address">Location</div>
            </div>
            <div className="company-list">{companyList}</div>
          </div>
        </>
      )}
    </>
  );
};

export default CompanyList;
