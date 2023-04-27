import { useState } from "react";

import SignInForm from "../../components/auth-components/sign-in/SignInForm";
import SignUpForm from "../../components/auth-components/sign-up/SignUpForm";

import "./AuthContainer.styles.scss";

const AuthContainer = () => {
  const [authChoice, setAuthChoice] = useState("signin");

  const toggleAuth = () => {
    setAuthChoice(authChoice === "signin" ? "signup" : "signin");
  };

  return (
    <div className="auth-container">
      <div className="image-container">
        <img
          className="image"
          src="https://img.freepik.com/free-photo/portrait-woman-customer-service-worker_144627-37943.jpg?w=2000&t=st=1682628038~exp=1682628638~hmac=5c1a12da8852cbb0d273627a11135ed75e839ba3702b33a7980863d7bb356b8a"
          alt="happy-service"
        />
      </div>
      <div className="auth-options">
        <div className="logo-container">
          <img className="logo" src="../assets/pp-logo-black.png" alt="logo" />
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
    </div>
  );
};

export default AuthContainer;
