import "./ProductScreen.css";
import { useEffect, useState, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  listProducts,
  detailProduct,
} from "../../redux/actions/ProductActions";
import { addToCart } from "../../redux/actions/cartActions";

import Slider from "react-slick";

//component/section
import Card from "../../section/Card/Card";
import LoadingBox from "../../component/loadingBox/LoadingBox";
import ErrorMessage from "../../component/errorMessage/ErrorMessage";

function ProductScreen(props) {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [qty, setQty] = useState(1);
  const productId = props.match.params.id;

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  const productDetail = useSelector((state) => state.productDetail);
  const { product, loadingDetail, errorDetail } = productDetail;

  useEffect(() => {
    dispatch(detailProduct(productId));
    dispatch(listProducts({}));
  }, [dispatch, productId]);

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty));
    props.history.push("/cart");
  };

  return (
    <div className="product_screen_container">
      <div className="product_top">
        {loadingDetail ? (
          <LoadingBox />
        ) : errorDetail ? (
          <ErrorMessage>{errorDetail}</ErrorMessage>
        ) : (
          <>
            <img src={product.imageUrl} alt="img" />
            <div className="product_screen_description_box">
              <h3>{product.name}</h3>

              <p className="product_screen_subtitle">{product.subTitle}</p>
              <p className="product_screen_description">
                {product.description}
              </p>
              <p className="product_screen_price">
                Price <span>{product.price}</span> $
              </p>
              <div className="product_screen_select">
                <p>Qty</p>
                {product.countInStock === 0 ? (
                  <h4 className="product_unavailable_msg">out of stock</h4>
                ) : (
                  <select value={qty} onChange={(e) => setQty(e.target.value)}>
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <button
                onClick={addToCartHandler}
                disabled={product.countInStock === 0}
              >
                Add to Cart
              </button>
            </div>
          </>
        )}
      </div>
      <div className="product_bottom">
        <h3>Best Seller</h3>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <div className="bottom_slider_bestseller">
            <Slider {...settings}>
              {products.length === 0 ? (
                <LoadingBox />
              ) : (
                products.map((product) => (
                  <Card key={product._id} product={product} />
                ))
              )}
            </Slider>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductScreen;
