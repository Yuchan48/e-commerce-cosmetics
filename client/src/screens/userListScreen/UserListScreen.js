import "./UserListScreen.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";

//component/section
import LoadingBox from "../../component/loadingBox/LoadingBox";
import ErrorMessage from "../../component/errorMessage/ErrorMessage";
import { deleteUser, listUsers } from "../../redux/actions/userActions";
import { USER_DELETE_RESET } from "../../redux/constants/userConstant";

function UserListScreen(props) {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: USER_DELETE_RESET });
    }
    dispatch(listUsers());
  }, [dispatch, successDelete]);

  const deleteHandler = (user) => {
    if (user.isAdmin) {
      alert("You can't delete admin user");
    } else if (window.confirm(`Are you sure to delete ${user.name}?`)) {
      dispatch(deleteUser(user._id));
    }
  };

  return (
    <div className="userlist_screen_container">
      <div className="userlist_bottom">
        <div className="userlist_title">
          <h3>Users</h3>
        </div>
        {loadingDelete && (
          <div className="userlist_loading_div">
            <LoadingBox />
          </div>
        )}
        {errorDelete && (
          <div className="userlist_error_message">
            <ErrorMessage>{errorDelete}</ErrorMessage>
          </div>
        )}

        {loading ? (
          <LoadingBox />
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <table className="userlist_table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <p>{user._id}</p>
                  </td>
                  <td className="userlist_username">{user.name}</td>
                  <td className="userlist_email">{user.email}</td>
                  <td>{user.isAdmin ? "YES" : "NO"}</td>
                  <td>
                    <div className="userlist_table_button">
                      <button
                        onClick={() =>
                          props.history.push(`/user/${user._id}/edit`)
                        }
                      >
                        Edit
                      </button>
                      <button onClick={() => deleteHandler(user)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default UserListScreen;
