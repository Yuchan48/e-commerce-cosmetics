import "./PlaceOrderScreen.css";
import React, { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ORDER_CREATE_RESET } from "../../redux/constants/orderConstant";

//image
import paypalImg from "../../images/PayPal.svg";
import stripeImg from "../../images/stripe.svg";

//component/section
import OrderSteps from "../../component/orderSteps/OrderSteps";
import { createOrder } from "../../redux/actions/orderActions";
import LoadingBox from "../../component/loadingBox/LoadingBox";
import ErrorMessage from "../../component/errorMessage/ErrorMessage";

function PlaceOrderScreen(props) {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }

  const getCartSubTotal = () => {
    return cartItems.reduce((price, item) => price + item.price * item.qty, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const shippingPriceTotal =
    cart.shippingAddress.country !== "Germany"
      ? 29.99
      : getCartSubTotal() < 60
      ? 10.99
      : 0;

  cart.itemsPrice = getCartSubTotal().toFixed(2);
  cart.shippingPrice = shippingPriceTotal;
  cart.totalPrice = (shippingPriceTotal + getCartSubTotal()).toFixed(2);

  const dispatch = useDispatch();
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, order, error, success } = orderCreate;
  const submitHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success, dispatch, order, props.history]);

  return (
    <div className="placeorder_screen_container">
      <div className="shipping_screen_top">
        <OrderSteps step1 step2 step3 step4 />
      </div>

      <div className="placeorder_bottom">
        <div className="placeorder_left">
          <h3>Confirm Your Order</h3>

          <div className="placeorder_order_items">
            <div className="placeorder_items_title">
              <h4>Order Items</h4>
              <p>{getCartCount()} item(s)</p>
            </div>
            {cart.cartItems.map((item, i) => (
              <div key={i} className="placeorder_item">
                <img src={item.imageUrl} alt="item img" />
                <Link
                  to={`/product/${item.product}`}
                  className="placeorder_item_name"
                >
                  {item.name}
                </Link>
                <p className="placeorder_item_price">
                  {item.price}$ x {item.qty} ={" "}
                  <strong>{item.price * item.qty}$</strong>
                </p>
              </div>
            ))}
          </div>

          <div className="placeorder_shipping_info">
            <div className="placeorder_shipping_title">
              <h4>Shipping Address</h4>
            </div>

            <div className="placeorder_shipping_row">
              <i className="fas fa-user"></i>
              <p>{cart.shippingAddress.fullName}</p>
            </div>
            <div className="placeorder_shipping_row">
              <i className="fas fa-map-marker-alt"></i>
              <p>
                {cart.shippingAddress.address} {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postcode} {cart.shippingAddress.country}
              </p>
            </div>
          </div>

          <div className="placeorder_payment_method">
            <div className="placeorder_payment_title">
              <h4>Payment Method</h4>
            </div>
            {cart.paymentMethod === "PayPal" ? (
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
            <p>Subtotal: &nbsp; {getCartSubTotal().toFixed(2)} $</p>
            <p>Shipping: &nbsp; {shippingPriceTotal} $</p>
            <div className="placeorder__right_small">
              <small>
                * free shipping to germany on orders over 60$. Shipping outside
                of Germany is 29.99$.
              </small>
            </div>
            <hr />
            <p className="placeorder_right_total">
              Total Price: {(shippingPriceTotal + getCartSubTotal()).toFixed(2)}{" "}
              $
            </p>

            <div className="placeorder_right_button">
              <button
                onClick={submitHandler}
                disabled={cart.cartItems.length === 0}
              >
                Place Order
              </button>
            </div>
            {loading && (
              <div className="placeorder_loading">
                <LoadingBox />
              </div>
            )}

            {error && (
              <div className="placeorder_error_message">
                <ErrorMessage>{error}</ErrorMessage>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;
