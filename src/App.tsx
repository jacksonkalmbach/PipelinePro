import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import SectionNavbar from "./components/section-navigation/SectionNavbar";
import Contacts from "./containers/Contacts";
import NavBar from "./routes/navigation/NavBar";

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
          <Route path="/contacts/*" element={<Contacts />}></Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
