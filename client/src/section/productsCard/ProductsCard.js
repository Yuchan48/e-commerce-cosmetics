import "./ProductsCard.css";
import { Link } from "react-router-dom";
import React from "react";

function ProductsCard({ product }) {
  return (
    <div className="product_card">
      <img src={product.imageUrl} alt="img" />
      <div className="product_card_description">
        <h4>{product.name}</h4>
        <p>{product.subTitle}</p>
        <p>{product.category}</p>
        <p className="product_card_price">
          Price <span>{product.price}</span> $
        </p>
        <Link to={`/product/${product._id}`}>
          <button>Shop</button>
        </Link>
      </div>
    </div>
  );
}

export default ProductsCard;
