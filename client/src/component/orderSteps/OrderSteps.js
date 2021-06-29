import "./OrderSteps.css";
import React from "react";
import { Link } from "react-router-dom";

function OrderSteps(props) {
  return (
    <div className="steps_order">
      <ul className="progressbar">
        <li className={props.step1 ? "active" : ""}>Sign-in</li>
        <li className={props.step2 ? "active" : ""}>
          <Link to="/shipping">Shipping</Link>
        </li>
        <li className={props.step3 ? "active" : ""}>
          <Link to="/payment">Payment</Link>
        </li>
        <li className={props.step4 ? "active" : ""}>Place Order</li>
      </ul>
    </div>
  );
}

export default OrderSteps;
