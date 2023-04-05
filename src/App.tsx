import React from "react";
import "./App.css";
import SectionNavbar from "./components/section-navigation/SectionNavbar";
import NavBar from "./routes/navigation/NavBar";

const App: React.FC = () => {
  return (
    <div className="App">
      <NavBar />
      <div className="main-container">
        <SectionNavbar />
      </div>
    </div>
  );
};

export default App;
