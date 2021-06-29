import "./BodyScreen.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { categoryProducts } from "../../redux/actions/ProductActions";

import bodyImg from "../../images/body-care-top.jpg";

//section / component
import BodyCard from "../../section/bodyCard/BodyCard";
import LoadingBox from "../../component/loadingBox/LoadingBox";
import ErrorMessage from "../../component/errorMessage/ErrorMessage";

function BodyScreen() {
  const dispatch = useDispatch();
  const productCategory = useSelector((state) => state.productCategory);
  const { products, loading, error } = productCategory;

  useEffect(() => {
    dispatch(categoryProducts("body & hair"));
  }, [dispatch]);
  return (
    <div className="body_screen_container">
      <div className="body_top">
        <img src={bodyImg} alt="img" />
        <div className="body_top_description">
          <h2>body Care</h2>
          <p>
            Every body rules. Which is why we offer the best
            straight-from-the-spa body care products and brand new body-loving
            must-haves that promise to leave you smoothed and soothed out in no
            time.
          </p>
        </div>
      </div>

      <div className="body_bottom">
        <div className="body_bottom_cards_container">
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <ErrorMessage>{error}</ErrorMessage>
          ) : (
            products.map((product) => (
              <BodyCard key={product._id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default BodyScreen;
