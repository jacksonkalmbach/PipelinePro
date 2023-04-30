import React, { useEffect } from "react";
import { signInWithGooglePopup } from "../../../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  userSignIn,
  setUserDisplayName,
  setUserEmail,
  setUserPhoto,
  setUserUid,
} from "../../../store/reducers/user/userAuthSlice";

import "./SignInForm.styles.scss";

const SignInForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleForgotPassword = () => {
    alert("forgot password!");
  };

  const handleGoogleSignIn = async () => {
    const { user } = await signInWithGooglePopup();
    dispatch(userSignIn());
    dispatch(setUserDisplayName(user.displayName));
    dispatch(setUserEmail(user.email));
    dispatch(setUserPhoto(user.photoURL));
    dispatch(setUserUid(user.uid));
    navigate("/dashboard");
  };

  useEffect(() => {
    console.log("user signed in");
  }, []);

  return (
    <div className="sign-in-options">
      <form className="sign-in-form">
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
        <p className="forgot-password" onClick={handleForgotPassword}>
          Forgot Password?
        </p>
        <button>Sign Up</button>
      </form>
      <div className="social-media-login">
        <img
          className="social-btn-login"
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fclipart.info%2Fimages%2Fccovers%2F1509135368facebook-logo-png-flat.png&f=1&nofb=1&ipt=b88a289419fbaa33f75ea5f2be5bc4a94198fc99fd8b9abe6f826f59dfadd6f4&ipo=images"
          alt="fb"
        />
        <img
          className="social-btn-login"
          src="https://www.shareicon.net/data/2016/07/10/119930_google_512x512.png"
          alt="goog"
          onClick={handleGoogleSignIn}
        />
      </div>
    </div>
  );
};

export default SignInForm;
