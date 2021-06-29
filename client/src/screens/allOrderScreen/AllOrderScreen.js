import "./AllOrderScreen.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

//component/section
import LoadingBox from "../../component/loadingBox/LoadingBox";
import ErrorMessage from "../../component/errorMessage/ErrorMessage";
import { ORDER_DELETE_RESET } from "../../redux/constants/orderConstant";
import { deleteOrder, listOrderAdmin } from "../../redux/actions/orderActions";

function AllOrderScreen(props) {
  const history = useHistory();

  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;

  const orderListAdmin = useSelector((state) => state.orderListAdmin);
  const { loading, error, orders } = orderListAdmin;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successDelete) {
      dispatch({ type: ORDER_DELETE_RESET });
    }
    dispatch(listOrderAdmin());
  }, [dispatch, successDelete]);

  const deleteHandler = (order) => {
    if (window.confirm(`Are you sure to delete order ID ${order._id}?`)) {
      dispatch(deleteOrder(order._id));
    }
  };

  return (
    <div className="allorder_screen_container">
      <div className="allorder_Bottom">
        <div className="allorder_title">
          <h3>All Orders</h3>
        </div>
        {loadingDelete && (
          <div className="allorder_loading_div">
            <LoadingBox />
          </div>
        )}
        {errorDelete && (
          <div className="allorder_error_message">
            <ErrorMessage>{errorDelete}</ErrorMessage>
          </div>
        )}
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <table className="allorder_table">
            <thead>
              <tr>
                <th>ID</th>
                <th className="allorder_username">USER</th>
                <th>DATE</th>
                <th>PRICE</th>
                <th>PAID</th>
                <th>
                  <i className="fas fa-truck"></i>
                </th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>
                    <p>{order._id}</p>
                  </td>
                  <td className="allorder_username">{order.user.name}</td>
                  <td>{new Date(order.createdAt).toDateString().substr(4)}</td>
                  <td>{order.totalPrice.toFixed(2)}$</td>
                  <td>
                    {order.isPaid
                      ? new Date(order.paidAt).toDateString().substr(4)
                      : "No"}
                  </td>
                  <td>
                    {order.isDelivered
                      ? new Date(order.deliveredAt).toDateString().substr(4)
                      : "No"}
                  </td>
                  <td>
                    <div className="allorder_table_button">
                      <button
                        onClick={() => history.push(`/order/${order._id}`)}
                      >
                        Details
                      </button>
                      <button onClick={() => deleteHandler(order)}>
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

export default AllOrderScreen;
