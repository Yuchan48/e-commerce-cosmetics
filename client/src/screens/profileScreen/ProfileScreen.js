import "./ProfileScreen.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { updateUserProfile } from "../../redux/actions/userActions";

//component
import LoadingBox from "../../component/loadingBox/LoadingBox";
import ErrorMessage from "../../component/errorMessage/ErrorMessage";
import { USER_UPDATE_PROFILE_RESET } from "../../redux/constants/userConstant";

function ProfileScreen() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [formData, setFormData] = useState({
    userId: userInfo._id,
    name: userInfo.name,
    email: userInfo.email,
    password: "",
    newpassword: "",
    confirmPassword: "",
  });
  const { name, email, password, newpassword, confirmPassword } = formData;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = userUpdateProfile;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
    }
  }, [dispatch, userInfo._id, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
    if (password) {
      if (newpassword.length > 0 && newpassword !== confirmPassword) {
        alert("new password and confirm password does not match");
      } else if (!name.match(nameRegex)) {
        alert("invalid name field");
      } else if (!email.match(emailRegex)) {
        alert("invalid email address");
      } else {
        dispatch(updateUserProfile(formData));
      }
    } else {
      alert("Please fill password field");
    }
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "name"
          ? capitalize(e.target.value)
          : e.target.name === "email"
          ? e.target.value.toLowerCase()
          : e.target.value,
    });
  };

  const capitalize = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <div className="profile_screen_container">
      <form className="profile_form_box" onSubmit={submitHandler}>
        <div className="profile_box-title">
          <h4>Your Profile</h4>
          <i className="fas fa-id-badge"></i>
        </div>
        <small>please fill out the field which you want to update</small>

        {
          <>
            {loadingUpdate && (
              <div className="signin_loading_box">
                <LoadingBox />
              </div>
            )}
            {errorUpdate && <ErrorMessage>{errorUpdate}</ErrorMessage>}
            {successUpdate && (
              <ErrorMessage>Profile Updated Successfully</ErrorMessage>
            )}

            <div className="profile_inputs">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={name}
                onChange={onChange}
              />
              <label htmlFor="email">Email Address</label>
              <input
                type="text"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={onChange}
              />
              <label htmlFor="newpassword">New Password</label>
              <input
                type="password"
                name="newpassword"
                placeholder="New Password"
                autoComplete="off"
                onChange={onChange}
              />
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                name="confirm-password"
                placeholder="Confirm Password"
                autoComplete="off"
                onChange={onChange}
              />

              <hr />
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="off"
                onChange={onChange}
                required
              />
            </div>
            <div className="profile_form_button">
              <button type="submit">
                Update <i className="fas fa-sync"></i>
              </button>
            </div>
          </>
        }
      </form>
    </div>
  );
}

export default ProfileScreen;
