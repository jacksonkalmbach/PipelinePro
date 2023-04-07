import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import SectionNavbar from "./components/section-navigation/SectionNavbar";
import Contacts from "./containers/Contacts";
import NavBar from "./routes/navigation/NavBar";
import Leads from "./containers/lead-container/Leads";
import Dashboard from "./containers/dashboard-container/Dashboard";

import { signInWithGooglePopup } from "./utils/firebase";
import {
  userSignIn,
  setUserUid,
  setUserPhoto,
  setUserEmail,
  setUserDisplayName,
} from "./store/reducers/user/userAuthSlice";
import AuthContainer from "./containers/auth-container/AuthContainer";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userIsSignedIn = useSelector((state: any) => state.userAuth.isSignedIn);
  const isDemo = useSelector((state: any) => state.userAuth.isDemo);

  const [hasMounted, sethasMounted] = useState(false);

  useEffect(() => {
    if (!hasMounted) {
      navigate("/login");
      sethasMounted(true);
    }
  }, [hasMounted, navigate]);

  return (
    <>
      {userIsSignedIn || isDemo ? (
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
      ) : (
        <AuthContainer />
      )}
    </>
  );
};

export default App;
