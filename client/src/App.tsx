import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userSignIn } from "./store/reducers/user/userAuthSlice";
import socket from "./utils/socket";

import "./App.css";
import MainSectionsNavbar from "./components/navigation-components/main-section-navbar/MainSectionsNavbar";
import NavBar from "./routes/navigation/NavBar";
import Leads from "./containers/lead-container/Leads";
import Dashboard from "./containers/dashboard-container/Dashboard";

// Containers
import Contacts from "./containers/contacts-container/Contacts";
import AuthContainer from "./containers/auth-container/AuthContainer";
import Settings from "./containers/settings-container/Settings";
import Calendar from "./containers/calendar-container/Calendar";
import AccountSettings from "./containers/settings-container/account/AccountSettings";
import NotificationSettings from "./containers/settings-container/notifications/NotificationSettings";
import BillingSettings from "./containers/settings-container/billing/BillingSettings";
import LandingPage from "./containers/landing-page/LandingPage";
import Chat from "./containers/chat-container/Chat";
import Company from "./containers/contacts-container/company/Company";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const userIsSignedIn = useSelector((state: any) => state.userAuth.isSignedIn);
  const [isLoaded, setIsLoaded] = useState(false);
  const isDemo = useSelector((state: any) => state.userAuth.isDemo);

  useEffect(() => {
    if (isDemo || userIsSignedIn) {
      dispatch(userSignIn());
      setTimeout(() => {
        setIsLoaded(true);
      }, 1000);
    }
  }, [isDemo, userIsSignedIn, dispatch]);

  useEffect(() => {
    if (userIsSignedIn) {
      socket.on("connect", () => {
        console.log("connected");
      });
    }
  }, [userIsSignedIn]);

  return (
    <>
      <NavBar />
      {!userIsSignedIn ? (
        <>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<AuthContainer />} />
          </Routes>
        </>
      ) : (
        <>
          {isLoaded ? (
            <>
              <>
                <div className="main-container">
                  <MainSectionsNavbar />
                  <Routes>
                    <Route path="/dashboard/*" element={<Dashboard />}></Route>
                    <Route path="/contacts/*" element={<Contacts />}>
                      <Route path="leads" element={<Leads />} />
                      <Route path="contacts" element={<div>Contacts</div>} />
                      <Route path="company" element={<Company />}>
                        <Route path="employees" element={<div>Employees</div>}>
                          <Route path=":id" element={<div>Employee</div>} />
                        </Route>
                      </Route>
                    </Route>
                    <Route path="/calendar/*" element={<Calendar />} />
                    <Route path="/chat/*" element={<Chat />} />
                    <Route path="/settings/*" element={<Settings />}>
                      <Route path="Account" element={<AccountSettings />} />
                      <Route
                        path="Notifications"
                        element={<NotificationSettings />}
                      />
                      <Route path="Billing" element={<BillingSettings />} />
                    </Route>
                  </Routes>
                </div>
              </>
            </>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "93vh",
                  width: "100vw",
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
            </>
          )}
        </>
      )}
    </>
  );
};

export default App;

//     {isDemo && !isLoaded ? (
