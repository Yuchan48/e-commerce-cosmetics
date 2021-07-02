import "./LoginScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import React, { useState, useLayoutEffect, useEffect } from "react";
import { signinUser } from "../../redux/actions/userActions";

//component
import LoadingBox from "../../component/loadingBox/LoadingBox";
import ErrorMessage from "../../component/errorMessage/ErrorMessage";

function LoginScreen(props) {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  const urlParam = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signinUser(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(urlParam);
    }
  }, [props.history, userInfo, urlParam]);

  return (
    <div className="login_screen_container">
      <form className="login_form_box" onSubmit={submitHandler}>
        <div className="login_box-title">
          <h4>Sign in</h4>
          <i className="fas fa-sign-in-alt"></i>
        </div>

        {loading && (
          <div className="signin_loading_box">
            <LoadingBox />
          </div>
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div className="login_inputs">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="email address"
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="login_form_button">
          <button type="submit">Sign in</button>
        </div>

        <div className="login_register_link">
          <p>Don't have an account? &nbsp;</p>
          <Link to={`/register?redirect=${urlParam}`}>Sign up</Link>
        </div>
      </form>
    </div>
  );
}

export default LoginScreen;
