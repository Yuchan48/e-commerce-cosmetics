import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../navbar/Navbar.css";
import { signoutUser } from "../../redux/actions/userActions";

function Navbar({ click }) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => qty + Number(item.qty), 0);
  };

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signoutUser());
  };

  return (
    <nav className="navbar">
      <ul className="navbar_links">
        <li>
          <Link to="/cart">
            <div className="nav_link">
              <span className="cartlogo_badge">{getCartCount()}</span>
              <i className="fas fa-shopping-cart"></i>
              <span>Cart</span>
            </div>
          </Link>
        </li>
        <li className="nav_link">
          {userInfo && userInfo.isAdmin ? (
            <div className="nav_dropdown">
              <span>Admin </span>
              <i className="fas fa-caret-down nav_icon_down"></i>
              <div className="nav_dropdown_content">
                <ul>
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/allorders">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign out
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          ) : userInfo ? (
            <div className="nav_dropdown">
              <span>{userInfo.name.substr(0, 4) + "..."}</span>
              <i className="fas fa-caret-down nav_icon_down"></i>
              <div className="nav_dropdown_content">
                <ul>
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Your Orders</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign out
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <Link to="/login">Sign in</Link>
          )}
        </li>
      </ul>

      <div className="navbar_middle_section">
        <div className="hamburger_menu" onClick={click}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="navbar_screen_links">
          <Link to="/search/skin">Skin Care</Link>
          <Link to="/search/body">Body & Hair</Link>
          <Link to="/allproducts">Shop All</Link>
        </div>
        <Link to="/" className="navbar_logo">
          <h4>Beauty Cosmetics</h4>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
