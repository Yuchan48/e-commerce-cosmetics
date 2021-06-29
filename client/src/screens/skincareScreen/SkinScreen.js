import "./SkinScreen.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { categoryProducts } from "../../redux/actions/ProductActions";

import SkinImg from "../../images/skin-care-top.jpg";

//section
import SkinCard from "../../section/skinCard/SkinCard";
import LoadingBox from "../../component/loadingBox/LoadingBox";
import ErrorMessage from "../../component/errorMessage/ErrorMessage";

function SkinScreen() {
  const dispatch = useDispatch();
  const productCategory = useSelector((state) => state.productCategory);
  const { products, loading, error } = productCategory;

  useEffect(() => {
    dispatch(categoryProducts("skin care"));
  }, [dispatch]);

  return (
    <div className="skincare_screen_container">
      <div className="skin_top">
        <img src={SkinImg} alt="img" />
        <div className="skin_top_description">
          <h2>Skin Care</h2>
          <p>
            Best face forward. Spa-powered cleansers, moisturizers and masks –
            in fab new forms and feels – deliver amazing results and an
            ahhh-inspiring skincare experience of 100% cruelty-free skincare
            products.
          </p>
        </div>
      </div>

      <div className="skin_bottom">
        <div className="skin_bottom_cards_container">
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <ErrorMessage>{error}</ErrorMessage>
          ) : (
            products.map((product) => (
              <SkinCard key={product._id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default SkinScreen;
