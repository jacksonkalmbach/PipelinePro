import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import SectionNavbar from "./components/section-navigation/SectionNavbar";
import Contacts from "./containers/Contacts";
import NavBar from "./routes/navigation/NavBar";
import Leads from "./containers/lead-container/Leads";
import Dashboard from "./containers/dashboard-container/Dashboard";

const App: React.FC = () => {
  const navigate = useNavigate();
  const [hasMounted, sethasMounted] = useState(false);

  useEffect(() => {
    if (!hasMounted) {
      navigate("/dashboard");
      sethasMounted(true);
    }
  }, [hasMounted, navigate]);

  return (
    <>
      <NavBar />
      <div className="main-container">
        <SectionNavbar />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contacts/*" element={<Contacts />}>
            <Route path="leads" element={<Leads />} />
            <Route path="contacts" element={<div>Contacts</div>} />
            <Route path="company" element={<div>Companies</div>}>
              <Route path="employees" element={<div>Employees</div>}>
                <Route path=":id" element={<div>Employee</div>} />
              </Route>
            </Route>
          </Route>
          <Route path="/calendar" element={<div>Calendar</div>} />
        </Routes>
      </div>
    </>
  );
};

export default App;
