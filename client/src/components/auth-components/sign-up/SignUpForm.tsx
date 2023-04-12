import React from "react";

import "./SignUpForm.styles.scss";

const SignUpForm = () => {
  return (
    <div className="sign-in-options">
      <form className="sign-in-form">
        <input
          required
          className="form-input"
          type="text"
          placeholder="Display Name"
        />
        <input
          required
          className="form-input"
          type="email"
          placeholder="Email"
        />
        <input
          required
          className="form-input"
          type="password"
          placeholder="Password"
        />
        <input
          required
          className="form-input"
          type="password"
          placeholder="Confirm Password"
        />
        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
