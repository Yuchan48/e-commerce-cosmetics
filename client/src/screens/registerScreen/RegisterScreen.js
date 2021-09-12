import "./RegisterScreen.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../../redux/actions/userActions";

import LoadingBox from "../../component/loadingBox/LoadingBox";
import ErrorMessage from "../../component/errorMessage/ErrorMessage";

function RegisterScreen(props) {
  const urlParam = props.location.search
    ? props.location.search.split("=")[1]
    : "/";


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: (e.target.name === "name")
        ? capitalize(e.target.value)
        : (e.target.name === "email")
        ? e.target.value.toLowerCase()
        : e.target.value,
    });
  };

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
    if (password !== confirmPassword) {
      alert("password and confirm password does not match");
    } else if (!name.match(nameRegex)) {
      alert("invalid name field");
    } else if (!email.match(emailRegex)) {
      alert("invalid email address");
    } else {
      dispatch(registerUser(formData));
    }
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(urlParam);
    }
  }, [props.history, userInfo, urlParam]);

  const capitalize = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <div className="register_screen_container">
      <form className="register_form_box" onSubmit={submitHandler}>
        <div className="register_box-title">
          <h4>Create Account</h4>
          <i className="fas fa-folder-plus"></i>
        </div>

        {loading && (
          <div className="signin_loading_box">
            <LoadingBox />
          </div>
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div className="register_inputs">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={name}
            onChange={onChange}
            required
          />
          <label htmlFor="email">Email Address</label>
          <input
            type="text"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={onChange}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="off"
            onChange={onChange}
            value={password}
            required
          />
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="confirm password"
            autoComplete="off"
            onChange={onChange}
            value={confirmPassword}
            required
          />
        </div>
        <div className="register_form_button">
          <button type="submit">Sign up</button>
        </div>

        <div className="register_login_link">
          <p>Already have an account? &nbsp;</p>
          <Link to={`/login?redirect=${urlParam}`}>Sign in</Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterScreen;
