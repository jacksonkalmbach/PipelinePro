import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import SectionNavbar from "./components/section-navigation/SectionNavbar";
import Contacts from "./containers/Contacts";
import Leads from "./containers/lead-container/Leads";
import NavBar from "./routes/navigation/NavBar";

const App: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/dashboard");
  }, []);

  return (
    <>
      <NavBar />
      <div className="main-container">
        <SectionNavbar />
        <Routes>
          <Route path="/contacts/*" element={<Contacts />}></Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
