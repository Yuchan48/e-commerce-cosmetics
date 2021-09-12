import "./EditProductScreen.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCT_UPDATE_RESET } from "../../redux/constants/productConstant";

import LoadingBox from "../../component/loadingBox/LoadingBox";
import ErrorMessage from "../../component/errorMessage/ErrorMessage";
import {
  detailProduct,
  updateProduct,
} from "../../redux/actions/ProductActions";

function EditProductScreen(props) {
  const productId = props.match.params.id;
  const [productInfo, setProductInfo] = useState({
    _id: productId,
    name: "",
    subTitle: "",
    description: "",
    category: "",
    bestSeller: false,
    price: 0,
    countInStock: 0,
    imageUrl: "",
  });

  const {
    name,
    subTitle,
    description,
    category,
    bestSeller,
    price,
    countInStock,
    imageUrl,
  } = productInfo;

  const productDetail = useSelector((state) => state.productDetail);
  const { loading, product, error } = productDetail;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = productUpdate;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      props.history.push("/productlist");
    }
    if (!product || product._id !== productId) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailProduct(productId));
    } else {
      setProductInfo((prev) => {
        return {
          ...prev,
          name: product.name,
          subTitle: product.subTitle,
          description: product.description,
          price: product.price.toFixed(2),
          countInStock: product.countInStock,
          category: product.category,
          bestSeller: product.bestSeller,
          imageUrl: product.imageUrl,
        };
      });
    }
  }, [dispatch, product, successUpdate, props.history, productId]);

  const capitalize = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct(productInfo));
  };

  const onChange = (e) => {
    setProductInfo({
      ...productInfo,
      [e.target.name]:
        e.target.name === "name"
          ? capitalize(e.target.value)
          : e.target.name === "bestSeller"
          ? !bestSeller
          : e.target.value,
    });
  };

  return (
    <div className="edit_product_screen_container">
      <form className="create_product_form_box" onSubmit={submitHandler}>
        <div className="create_product_title">
          <h2>Update Product</h2>
          <i className="fas fa-edit"></i>
        </div>

        {loading ? (
          <div className="create_product_loading">
            <LoadingBox />
          </div>
        ) : error ? (
          <div className="create_product_error">
            <ErrorMessage>{error}</ErrorMessage>
          </div>
        ) : (
          <>
            <div className="create_product_form_description">
              <div className="create_product_input_box">
                <label htmlFor="name">Product Name *</label>
                <input
                  type="text"
                  id="name"
                  maxLength="20"
                  value={name}
                  onChange={onChange}
                  placeholder="Product Name"
                />
              </div>
              <div className="create_product_input_box">
                <label htmlFor="subTitle">Subtitle *</label>
                <input
                  type="text"
                  id="subTitle"
                  maxLength="40"
                  value={subTitle}
                  onChange={onChange}
                  placeholder="Subtitle"
                />
              </div>
              <div className="create_product_input_box">
                <label htmlFor="description">Description *</label>
                <textarea
                  type="text"
                  id="description"
                  maxLength="300"
                  placeholder="Description"
                  rows="3"
                  value={description}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="create_product_form_extra">
              <div className="create_product_extra  create_small">
                <label htmlFor="price">Price ($) *</label>
                <input
                  type="text"
                  id="price"
                  placeholder="Price"
                  value={price}
                  onChange={onChange}
                />
              </div>
              <div className="create_product_extra  create_small">
                <label htmlFor="countInStock">Product Count *</label>
                <input
                  type="number"
                  id="countInStock"
                  placeholder="Product Count"
                  min="0"
                  value={countInStock}
                  onChange={onChange}
                />
              </div>

              <div className="create_product_extra create_small">
                <label htmlFor="category">Category *</label>
                <select
                  name="category"
                  id="category"
                  value={category}
                  onChange={onChange}
                >
                  <option
                    value={
                      category === "skin care" ? "skin care" : "body & hair"
                    }
                  >
                    {category === "skin care" ? "Skin Care" : "Body & Hair"}
                  </option>
                  <option
                    value={
                      category === "skin care" ? "body & hair" : "skin care"
                    }
                  >
                    {category === "skin care" ? "Body & Hair" : "Skin Care"}
                  </option>
                </select>
              </div>
              <div className="create_product_extra">
                <label htmlFor="bestSeller">Best Seller</label>
                <input
                  type="checkbox"
                  id="bestSeller"
                  className="create_product_checkbox"
                  checked={bestSeller ? true : false}
                  onChange={onChange}
                />
              </div>
              <div className="create_product_input_box">
                <label htmlFor="imageUrl">Product Image (.jpg) *</label>
                <input
                  type="text"
                  id="imageUrl"
                  placeholder="Link to the product image"
                  value={imageUrl}
                  onChange={onChange}
                />
                {imageUrl && <img src={imageUrl} alt="img" />}
              </div>

              {loadingUpdate && (
                <div className="create_product_loading">
                  <LoadingBox />
                </div>
              )}
              {errorUpdate && (
                <div className="create_product_error">
                  <ErrorMessage>{errorUpdate}</ErrorMessage>
                </div>
              )}

              <div className="create_product_button">
                <button type="submit">Update</button>
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default EditProductScreen;
