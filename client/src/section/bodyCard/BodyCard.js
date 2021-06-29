import "./BodyCard.css";
import React from "react";
import { Link } from "react-router-dom";

function BodyCard({ product }) {
  return (
    <div className="body_card">
      <img src={product.imageUrl} alt="img" />
      <div className="body_card_description">
        <h4>{product.name}</h4>
        <p>{product.subTitle}</p>
        <p className="body_card_price">
          Price <span>{product.price}</span> $
        </p>
        <Link to={`/product/${product._id}`}>
          <button>Shop</button>
        </Link>
      </div>
    </div>
  );
}

export default BodyCard;
