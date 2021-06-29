import "./ShippingScreen.css";
import OrderSteps from "../../component/orderSteps/OrderSteps";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { saveShippingAddress } from "../../redux/actions/cartActions";

function ShippingScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  if (!userInfo) {
    props.history.push("/login");
  }

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postcode, setPostcode] = useState(shippingAddress.postcode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
    if (!fullName.match(nameRegex)) {
      alert("invalid name field");
    } else {
      dispatch(
        saveShippingAddress({ fullName, address, city, postcode, country })
      );
      props.history.push("/payment");
    }
  };

  const capitalize = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <div className="shipping_screen_container">
      <div className="shipping_screen_top">
        <OrderSteps step1 step2 />
      </div>

      <div className="shipping_screen_bottom">
        <form className="shipping_form_box" onSubmit={submitHandler}>
          <h4>Shipping Address</h4>
          <div className="shipping_inputs">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(capitalize(e.target.value))}
              placeholder="Full Name"
              required
            />
          </div>

          <div className="shipping_inputs">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              required
            />
          </div>

          <div className="shipping_inputs">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(capitalize(e.target.value))}
              placeholder="City"
              required
            />
          </div>

          <div className="shipping_inputs">
            <label htmlFor="postcode">Postal Code</label>
            <input
              type="text"
              id="postcode"
              placeholder="Postal Code"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value.toUpperCase())}
              required
            />
          </div>

          <div className="shipping_inputs">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
              required
            />
          </div>

          <div className="shipping_button">
            <button type="submit">Continue</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ShippingScreen;
