import React from "react";
import { Outlet } from "react-router-dom";
import SubSectionNavbar from "../subsection-navbar/SectionNavbar";

const Settings = () => {
  return (
    <>
      <div>Settings Container</div>
      <Outlet />
    </>
  );
};

export default Settings;
