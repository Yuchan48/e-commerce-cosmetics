import "./Card.css";
import React from "react";
import { Link } from "react-router-dom";

function Card({ product }) {
  return (
    <div className="card_container">
      <img src={product.imageUrl} alt="img" />
      <div className="card_description_box">
        <h4>{product.name}</h4>
        <p>{product.subTitle}</p>
        <p className="card_price">
          Price <span>{product.price}</span> $
        </p>
        <Link to={`/product/${product._id}/`}>
          <button>Shop</button>
        </Link>
      </div>
    </div>
  );
}

export default Card;
