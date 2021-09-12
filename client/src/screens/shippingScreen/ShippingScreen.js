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

  const [shippingInfo, setShippingInfo] = useState({
    fullName: shippingAddress.fullName,
    address: shippingAddress.address,
    city: shippingAddress.city,
    postcode: shippingAddress.postcode,
    country: shippingAddress.country,
  });

  const { fullName, address, city, postcode, country } = shippingInfo;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
    if (!fullName.match(nameRegex)) {
      alert("invalid name field");
    } else {
      dispatch(
        saveShippingAddress(shippingInfo)
      );
      props.history.push("/payment");
    }
  };

  const onChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]:
        e.target.name === "fullName" || e.target.name === "city"
          ? capitalize(e.target.value)
          : e.target.name === "postcode"
          ? e.target.value.toUpperCase()
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
              name="fullName"
              value={fullName}
              onChange={onChange}
              placeholder="Full Name"
              required
            />
          </div>

          <div className="shipping_inputs">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              value={address}
              onChange={onChange}
              placeholder="Address"
              required
            />
          </div>

          <div className="shipping_inputs">
            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              value={city}
              onChange={onChange}
              placeholder="City"
              required
            />
          </div>

          <div className="shipping_inputs">
            <label htmlFor="postcode">Postal Code</label>
            <input
              type="text"
              name="postcode"
              placeholder="Postal Code"
              value={postcode}
              onChange={onChange}
              required
            />
          </div>

          <div className="shipping_inputs">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              name="country"
              value={country}
              onChange={onChange}
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
