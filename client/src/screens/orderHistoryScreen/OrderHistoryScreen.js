import "./OrderHistoryScreen.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

//component/section
import LoadingBox from "../../component/loadingBox/LoadingBox";
import ErrorMessage from "../../component/errorMessage/ErrorMessage";
import { listOrderUser } from "../../redux/actions/orderActions";

function OrderHistoryScreen() {
  const orderListUser = useSelector((state) => state.orderListUser);
  const { loading, orders, error } = orderListUser;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrderUser());
  }, [dispatch]);

  return (
    <div className="order_history_screen_container">
      <div className="order_history_Bottom">
        <h3>Your Orders</h3>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : orders.length === 0 ? (
          <div className="order_history_empty">
            You don't have any order with us.
          </div>
        ) : (
          <table className="order_history_table">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
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
                  <td className="order_history_table_id">
                    <p>{order._id}</p>
                  </td>
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
                    <Link to={`/order/${order._id}`}>Details</Link>
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

export default OrderHistoryScreen;
