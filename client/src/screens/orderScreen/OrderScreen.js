import "./OrderScreen.css";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import StripeCheckout from "react-stripe-checkout";

import {
  deliverOrder,
  detailsOrder,
  payOrder,
} from "../../redux/actions/orderActions";
import {
  ORDER_DELIVERED_RESET,
  ORDER_PAY_RESET,
} from "../../redux/constants/orderConstant";

//image
import paypalImg from "../../images/PayPal.svg";
import stripeImg from "../../images/stripe.svg";

//component/section
import LoadingBox from "../../component/loadingBox/LoadingBox";
import ErrorMessage from "../../component/errorMessage/ErrorMessage";

function OrderScreen(props) {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  const orderId = props.match.params.id;
  const [paypalScript, setPaypalScript] = useState(false);
  const [stripeKey, setStripeKey] = useState("");
  const [stripePayFail, setStripePayFail] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;

  const orderDelivered = useSelector((state) => state.orderDelivered);
  const {
    loading: loadingDeliver,
    success: successDeliver,
    error: errorDeliver,
  } = orderDelivered;

  const dispatch = useDispatch();

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}&disable-funding=giropay`;
      script.async = true;
      script.onload = () => {
        setPaypalScript(true);
      };
      document.body.appendChild(script);
    };

    const getStripeKey = async () => {
      const { data } = await axios.get("/api/config/stripe");
      setStripeKey(data);
    };

    if (
      !order ||
      successPay ||
      (order && order._id !== orderId) ||
      successDeliver
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVERED_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid && order.paymentMethod === "PayPal") {
        if (!window.paypal) {
          addPaypalScript();
        } else {
          setPaypalScript(true);
        }
      } else if (
        !order.isPaid &&
        order.paymentMethod === "Stripe" &&
        stripeKey.length === 0
      ) {
        getStripeKey();
      }
    }
  }, [
    dispatch,
    orderId,
    order,
    paypalScript,
    successPay,
    stripeKey.length,
    successDeliver,
  ]);

  const paymentSuccessHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  const makeStripePayment = async (token) => {
    try {
      const { data } = await axios.post("/api/payment", { token, order });
      if (data.status === "success") {
        const paymentResult = {
          id: data.chargeId,
          update_time: new Date(data.update_time * 1000).toDateString(),
          status: data.status,
        };
        dispatch(payOrder(order, paymentResult));
      }
    } catch (error) {
      setStripePayFail(true);
    }
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };

  return (
    <div className="order_screen_container">
      <div className="placeorder_bottom">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <>
            <div className="placeorder_left">
              {loadingDeliver ? (
                <div className="order_screen_loading_deliver">
                  <LoadingBox />
                </div>
              ) : userInfo.isAdmin && order.isPaid && !order.isDelivered ? (
                <div className="order_screen_delivered_button">
                  <button onClick={deliverHandler}> mark as delivered</button>
                </div>
              ) : (
                <> </>
              )}

              {errorDeliver && (
                <div>
                  <ErrorMessage>{errorDeliver}</ErrorMessage>
                </div>
              )}
              <h3>Your Order ID: {order._id}</h3>
              <small>
                order created on{" "}
                {new Date(order.createdAt).toLocaleString("en-GB")}
              </small>

              <div className="placeorder_order_items">
                <div className="placeorder_items_title">
                  <h4>Order Items</h4>
                </div>

                {order.orderItems.map((item) => (
                  <div key={item.product} className="placeorder_item">
                    <img src={item.imageUrl} alt="item img" />
                    <Link
                      to={`/product/${item.product}`}
                      className="placeorder_item_name"
                    >
                      {item.name}
                    </Link>
                    <p className="placeorder_item_price">
                      {item.price}$ x {item.qty} = &nbsp;
                      <strong>{item.price * item.qty}$</strong>
                    </p>
                  </div>
                ))}
              </div>

              <div className="placeorder_shipping_info">
                <div className="order_shipping_title">
                  <h4>Shipping Address</h4>

                  {order.isDelivered ? (
                    <p className="order_deliver_success">
                      Delivered at <br />{" "}
                      {new Date(order.deliveredAt).toDateString()}
                    </p>
                  ) : (
                    <p>Delivery in process</p>
                  )}
                </div>

                <div className="placeorder_shipping_row">
                  <i className="fas fa-user"></i>
                  <p>{order.shippingAddress.fullName}</p>
                </div>
                <div className="placeorder_shipping_row">
                  <i className="fas fa-map-marker-alt"></i>
                  <p>
                    {order.shippingAddress.address} {order.shippingAddress.city}{" "}
                    {order.shippingAddress.postcode}{" "}
                    {order.shippingAddress.country}
                  </p>
                </div>
              </div>

              <div className="placeorder_payment_method">
                <div className="order_payment_title">
                  <h4>Payment Method</h4>

                  {order.isPaid ? (
                    <p className="order_paid_success">
                      Paid on <br /> {new Date(order.paidAt).toDateString()}
                    </p>
                  ) : (
                    <p>Not paid</p>
                  )}
                </div>
                {order.paymentMethod === "PayPal" ? (
                  <img src={paypalImg} alt="paypal" />
                ) : (
                  <img src={stripeImg} alt="stripe" />
                )}
              </div>
            </div>

            <div className="placeorder_right">
              <div className="placeorder_order_summary">
                <div className="placeorder_right_title">
                  <h4>Price</h4>
                </div>
                <p>Subtotal: &nbsp; {order.itemsPrice.toFixed(2)} $</p>
                <p>Shipping: &nbsp; {order.shippingPrice.toFixed(2)} $</p>

                <hr />
                <p className="placeorder_right_total">
                  Total Price: {order.totalPrice.toFixed(2)} $
                </p>
                {!order.isPaid && (
                  <div className="order_bottom_button_box">
                    {!paypalScript && order.paymentMethod === "PayPal" ? (
                      <LoadingBox />
                    ) : order.paymentMethod === "PayPal" ? (
                      <>
                        {loadingPay && <LoadingBox />}
                        {errorPay && <ErrorMessage>{errorPay}</ErrorMessage>}
                        <PayPalButton
                          amount={order.totalPrice}
                          onSuccess={paymentSuccessHandler}
                        ></PayPalButton>
                      </>
                    ) : stripeKey.length === 0 &&
                      order.paymentMethod === "Stripe" ? (
                      <LoadingBox />
                    ) : (
                      <div className="stripe_pay_button_box">
                        {loadingPay && <LoadingBox />}
                        {errorPay && <ErrorMessage>{errorPay}</ErrorMessage>}
                        {stripePayFail && (
                          <ErrorMessage>
                            Payment couldn't be processed
                          </ErrorMessage>
                        )}

                        <StripeCheckout
                          stripeKey={stripeKey}
                          token={makeStripePayment}
                          amount={order.totalPrice * 100}
                          name={`total price: ${order.totalPrice}`}
                          billingAddress
                          shippingAddress
                        >
                          <button>Pay With Card</button>
                        </StripeCheckout>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default OrderScreen;
