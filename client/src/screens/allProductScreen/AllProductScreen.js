import "./AllProductScreen.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import SkinImg from "../../images/skin-care-top.jpg";
//section/component
import LoadingBox from "../../component/loadingBox/LoadingBox";
import ErrorMessage from "../../component/errorMessage/ErrorMessage";
import { listAllProducts } from "../../redux/actions/ProductActions";
import ProductsCard from "../../section/productsCard/ProductsCard";

function AllProductScreen() {
  const dispatch = useDispatch();
  const productListAll = useSelector((state) => state.productListAll);
  const { products, loading, error } = productListAll;

  useEffect(() => {
    dispatch(listAllProducts());
  }, [dispatch]);

  return (
    <div className="allproduct_screen_container">
      <div className="allproduct_top">
        <img src={SkinImg} alt="img" />
        <div className="allproduct_top_description">
          <h2>Shop All</h2>
          <p>
            Good skin is Beauty Cosmetics. Cleansers, masks, butters, wax and
            everything in between. From O.G. icons to the latest in skincare
            innovation, treat yourself from head-to-toe with face and body
            products from us.
          </p>
        </div>
      </div>

      <div className="allproduct_bottom">
        <div className="allproduct_bottom_cards_container">
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <ErrorMessage>{error}</ErrorMessage>
          ) : (
            products.map((product) => (
              <ProductsCard key={product._id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AllProductScreen;
