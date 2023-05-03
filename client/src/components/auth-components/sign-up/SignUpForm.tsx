import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  userSignIn,
  setUserDisplayName,
  setUserEmail,
  setUserPhoto,
  setUserUid,
} from "../../../store/reducers/user/userAuthSlice";

import "../sign-in/SignInForm.styles.scss";

const defaultFormFields = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confrimPassword: "",
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState(defaultFormFields);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formFields.password !== formFields.confrimPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const user = { ...formFields };
      const response = await fetch("http://localhost:5001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      console.log("HIT THE SIGN UP ROUTE", data);
      dispatch(setUserUid(data.id));
      dispatch(userSignIn());
      navigate(`/dashboard/${data.id}`);
    } catch (error) {
      console.log("error signing up", error);
    }
  };

  return (
    <div className="sign-in-options">
      <form className="sign-in-form" onSubmit={handleSignUp}>
        <input
          required
          className="form-input"
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleInputChange}
        />
        <input
          required
          className="form-input"
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleInputChange}
        />
        <input
          required
          className="form-input"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleInputChange}
        />
        <input
          required
          className="form-input"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleInputChange}
        />
        <input
          required
          className="form-input"
          type="password"
          name="confrimPassword"
          placeholder="Confirm Password"
          onChange={handleInputChange}
        />
        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
