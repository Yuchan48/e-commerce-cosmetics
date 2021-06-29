import "./PaymentScreen.css";
import OrderSteps from "../../component/orderSteps/OrderSteps";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { savePaymentMethod } from "../../redux/actions/cartActions";

//image
import paypalImg from "../../images/PayPal.svg";
import stripeImg from "../../images/stripe.svg";

function PaymentScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress) {
    props.history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/placeorder");
  };

  return (
    <div className="payment_screen_container">
      <div className="shipping_screen_top">
        <OrderSteps step1 step2 step3 />
      </div>

      <div className="payment_screen_bottom">
        <form className="payment_form" onSubmit={submitHandler}>
          <h4>Select a Payment Method</h4>
          <div className="payment_radio_box">
            <div className="payment_radio">
              <input
                type="radio"
                id="paypal"
                value="PayPal"
                name="paymentMethod"
                required
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="paypal">
                <img src={paypalImg} alt="paypal" />
              </label>
            </div>
            <div className="payment_radio">
              <input
                type="radio"
                id="stripe"
                value="Stripe"
                name="paymentMethod"
                required
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="stripe">
                <img src={stripeImg} alt="stripe" />
              </label>
            </div>
          </div>

          <div className="payment_button">
            <button type="submit">Continue</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PaymentScreen;
