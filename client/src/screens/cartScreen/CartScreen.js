import "./CartScreen.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

//component/section
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";
//import ErrorMessage from "../../component/errorMessage/ErrorMessage";

function CartScreen(props) {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  const removeHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartSubTotal = () => {
    return cartItems.reduce((price, item) => price + item.price * item.qty, 0);
  };

  const checkoutHandler = () => {
    props.history.push("/login?redirect=shipping");
  };

  return (
    <div className="cart_screen_container">
      <div className="cart_screen_top">
        <h1>Shopping Cart</h1>
      </div>

      <div className="cart_screen_bottom">
        <div className="cart_screen_left">
          {cartItems.length === 0 ? (
            <div className="cart_empty">
              Your Cart Is Empty <Link to="/">Go Back</Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.product} className="cart_screen_left_item">
                <img src={item.imageUrl} alt={item.name} />
                <div className="cart_screen_left_item_description">
                  <div className="cart_screen_left_titles">
                    <Link
                      to={`/product/${item.product}`}
                      className="cartitem_name"
                    >
                      <h4>{item.name}</h4>
                    </Link>
                    <p className="cart_screen_left_subtitle">{item.subTitle}</p>
                  </div>
                  <div className="cart_screen_left_details">
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        qtyChangeHandler(item.product, e.target.value)
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    <p className="cart_screen_left_price">
                      {item.price * item.qty} $
                    </p>
                    <p onClick={() => removeHandler(item.product)}>Remove</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart_screen_right">
          <div className="cart_screen_right_box">
            <p className="cart_screen_bottom_subtotal">
              Subtotal : &nbsp; {getCartSubTotal().toFixed(2)} $
            </p>
            <p>
              Shipping : &nbsp; {getCartSubTotal() < 60 ? 10.99 : 0} ${" "}
              <small>* free shipping on orders over 60$</small>
            </p>
            <p>{getCartCount()} item(s)</p>
            <a href="/">continue shopping</a>
            <hr />
            <div className="cart_screen_right_button">
              <button
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
              >
                Check-out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartScreen;
