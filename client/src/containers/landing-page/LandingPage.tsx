import React from "react";
import { useDispatch } from "react-redux";
import { setIsDemo, userSignIn } from "../../store/reducers/user/userAuthSlice";
import { useNavigate } from "react-router-dom";

import "./LandingPage.styles.scss";

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDemoClick = () => {
    dispatch(setIsDemo(true));
    dispatch(userSignIn());
    navigate("/dashboard");
  };

  return (
    <div className="landing-page-container">
      <button onClick={handleDemoClick}>Try Demo</button>
    </div>
  );
};

export default LandingPage;
