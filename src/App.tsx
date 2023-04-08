import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";

import "./App.css";
import SectionNavbar from "./components/section-navigation/SectionNavbar";
import NavBar from "./routes/navigation/NavBar";
import Leads from "./containers/lead-container/Leads";
import Dashboard from "./containers/dashboard-container/Dashboard";

// Containers
import Contacts from "./containers/contacts-container/Contacts";
import AuthContainer from "./containers/auth-container/AuthContainer";
import Settings from "./containers/settings-container/Settings";
import Calendar from "./containers/calendar-container/Calendar";

const App: React.FC = () => {
  const navigate = useNavigate();
  const userIsSignedIn = useSelector((state: any) => state.userAuth.isSignedIn);
  const [isLoaded, setIsLoaded] = useState(false);
  const isDemo = useSelector((state: any) => state.userAuth.isDemo);

  const [hasMounted, sethasMounted] = useState(false);

  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1200 },
  });

  useEffect(() => {
    if (isDemo) {
      setTimeout(() => {
        setIsLoaded(true);
      }, 1100);
    }
  }, [isDemo]);

  // useEffect(() => {
  //   if (!hasMounted) {
  //     navigate("/login");
  //     sethasMounted(true);
  //   }
  // }, [hasMounted, navigate]);

  return (
    <>
      {userIsSignedIn || isDemo ? (
        <>
          {isDemo && !isLoaded ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <div
                style={{
                  width: "6rem",
                  height: "6rem",
                  border: "5px solid #ff7043",
                  borderTopColor: "transparent",
                  borderRadius: "50%",
                  animation: "spin 1s ease-in-out infinite",
                }}
              ></div>
            </div>
          ) : (
            <animated.div style={props}>
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
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </div>
            </animated.div>
          )}
        </>
      ) : (
        <AuthContainer />
      )}
    </>
  );
};

export default App;
