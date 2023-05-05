import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useDispatch } from "react-redux";
import { setIsDemo, userSignIn } from "../../store/reducers/user/userAuthSlice";
import { useNavigate, Link } from "react-router-dom";

import "./LandingPage.styles.scss";

const LandingPage = () => {
  const { ws } = useContext(UserContext);
  const signIn = () => {
    ws.emit("sign-in");
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDemoClick = () => {
    signIn();
    dispatch(setIsDemo(true));
    dispatch(userSignIn());
    navigate("/dashboard");
  };

  return (
    <div className="landing-page-container">
      <div className="hero-container">
        <div className="hero-title-container">
          <h1 className="hero-title">
            Maximizing the <span className="emphasis">Potential</span> of your
            Employees
          </h1>
          <h3 className="hero-subtitle">
            PipelinePro: The All-in-One Tool for Managing Your Sales Pipeline.
            Close More Deals with Less Hassle.
          </h3>
          <div className="buttons-container">
            <Link to="/login">
              <button className="get-started-button">Get Started</button>
            </Link>
            <button className="try-demo-button" onClick={handleDemoClick}>
              Try Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
