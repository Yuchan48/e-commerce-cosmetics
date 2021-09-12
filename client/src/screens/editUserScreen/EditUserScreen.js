import "./EditUserScreen.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

//component
import LoadingBox from "../../component/loadingBox/LoadingBox";
import ErrorMessage from "../../component/errorMessage/ErrorMessage";
import { detailsUser, editUser } from "../../redux/actions/userActions";
import { USER_EDIT_RESET } from "../../redux/constants/userConstant";

function EditUserScreen(props) {
  const userId = props.match.params.id;
  const [formData, setFormData] = useState({
    _id: userId,
    name: "",
    email: "",
    isAdmin: false,
  });
  const { name, email, isAdmin } = formData;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userEdit = useSelector((state) => state.userEdit);
  const {
    loading: loadingEdit,
    error: errorEdit,
    success: successEdit,
  } = userEdit;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successEdit) {
      dispatch({ type: USER_EDIT_RESET });
      props.history.push("/userlist");
    }

    if (!user || userId !== user._id) {
      dispatch(detailsUser(userId));
    } else {
      setFormData((prev) => {
        return {
          ...prev,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        };
      });
    }
  }, [dispatch, successEdit, props.history, userId, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      user.name === name &&
      user.email === email &&
      user.isAdmin === isAdmin
    ) {
      alert("no field to update");
    } else {
      dispatch(editUser(formData));
    }
  };

  const checkBoxClick = () => {
    setFormData({
      ...formData,
      isAdmin: !isAdmin,
    });
  };

  const capitalize = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };
  return (
    <div className="edituser_screen_container">
      <form className="edituser_form_box" onSubmit={submitHandler}>
        <div className="edituser_box-title">
          <h4>User Profile</h4>
          <i className="fas fa-id-badge"></i>
        </div>
        <small>please fill out the field to edit</small>

        {loading ? (
          <div className="signin_loading_box">
            <LoadingBox />
          </div>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <>
            {loadingEdit && (
              <div className="signin_loading_box">
                <LoadingBox />
              </div>
            )}
            {errorEdit && <ErrorMessage>{errorEdit}</ErrorMessage>}

            <div className="edituser_inputs">
              <label htmlFor="name">User Name</label>
              <input
                type="name"
                placeholder="User Name"
                value={name}
                onChange={(e) =>
                  setFormData({ ...formData, name: capitalize(e.target.value) })
                }
              />
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value.toLowerCase(),
                  })
                }
              />

              <div className="edituser_extra">
                <label htmlFor="isAdmin">Is Admin ?</label>
                <input
                  type="checkbox"
                  id="isAdmin"
                  className={`edituser_checkbox ${isAdmin ? "show" : ""}`}
                  value={isAdmin}
                  onClick={checkBoxClick}
                />
              </div>
            </div>
            <div className="edituser_form_button">
              <button type="submit">
                Edit <i className="fas fa-sync"></i>
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default EditUserScreen;
