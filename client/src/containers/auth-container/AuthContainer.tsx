import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsDemo } from "../../store/reducers/user/userAuthSlice";
import SignInForm from "../../components/auth-components/sign-in/SignInForm";
import SignUpForm from "../../components/auth-components/sign-up/SignUpForm";

import "./AuthContainer.styles.scss";

const AuthContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authChoice, setAuthChoice] = useState("signin");

  const toggleAuth = () => {
    setAuthChoice(authChoice === "signin" ? "signup" : "signin");
  };

  const handleDemoClick = () => {
    dispatch(setIsDemo(true));
    navigate("/dashboard");
  };

  return (
    <div className="auth-container">
      <div className="auth-options">
        <div className="logo-container">
          <img className="logo" src="../pp-logo-black.png" alt="logo" />
        </div>
        <div>
          {authChoice === "signin" ? (
            <h1 className="auth-subtitle">Welcome Back</h1>
          ) : (
            <h1 className="auth-subtitle">Create Account</h1>
          )}
        </div>
        <div className={`toggle-auth toggle-auth--${authChoice}`}>
          <div
            className={`toggle-auth-option ${
              authChoice === "signin" ? "active" : ""
            }`}
            onClick={toggleAuth}
          >
            Sign In
          </div>
          <div
            className={`toggle-auth-option ${
              authChoice === "signup" ? "active" : ""
            }`}
            onClick={toggleAuth}
          >
            Sign Up
          </div>
        </div>
        <div className="form-container">
          {authChoice === "signin" ? <SignInForm /> : <SignUpForm />}
        </div>
      </div>
      <p className="try-demo" onClick={handleDemoClick}>
        Try the demo
      </p>
    </div>
  );
};

export default AuthContainer;
