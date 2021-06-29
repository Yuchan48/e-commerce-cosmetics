import "./TopDrawer.css";
import { Link } from "react-router-dom";
import React from "react";

function TopDrawer({ show, click }) {
  const topDrawerClass = ["topdrawer_container"];

  if (show) {
    topDrawerClass.push("show");
  }

  return (
    <div className={topDrawerClass.join(" ")}>
      <ul className="top_drawer_links" onClick={click}>
        <li>
          <Link to="/search/skin">Skin Care</Link>
        </li>
        <li>
          <Link to="/search/body">Body & Hair</Link>
        </li>
        <li>
          <Link to="/allproducts">Shop All</Link>
        </li>
      </ul>
    </div>
  );
}

export default TopDrawer;
