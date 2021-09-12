import "./CreateProductScreen.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCT_CREATE_RESET } from "../../redux/constants/productConstant";
import { createProduct } from "../../redux/actions/ProductActions";

import LoadingBox from "../../component/loadingBox/LoadingBox";
import ErrorMessage from "../../component/errorMessage/ErrorMessage";

function CreateProductScreen(props) {
  const [productInfo, setProductInfo] = useState({
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

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, success, product, error } = productCreate;
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/${product._id}/edit`);
    }
  }, [dispatch, product, success, props.history]);

  const capitalize = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    typeof Number(price) !== "number"
      ? alert("invalid price")
      : countInStock < 0 || typeof Number(countInStock) !== "number"
      ? alert("product count must be more than 0")
      : category.length === 0
      ? alert("please select category")
      : dispatch(createProduct(productInfo));
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
    <div className="create_product_screen_container">
      <form className="create_product_form_box" onSubmit={submitHandler}>
        <div className="create_product_title">
          <h2>Create Product</h2>
          <i className="fas fa-plus-square"></i>
        </div>

        <div className="create_product_form_description">
          <div className="create_product_input_box">
            <label htmlFor="name">Product Name *</label>
            <input
              type="text"
              name="name"
              maxLength="20"
              value={name}
              onChange={onChange}
              placeholder="Product Name"
              required
            />
          </div>
          <div className="create_product_input_box">
            <label htmlFor="subTitle">Subtitle *</label>
            <input
              type="text"
              name="subTitle"
              value={subTitle}
              maxLength="40"
              onChange={onChange}
              placeholder="Subtitle"
              required
            />
          </div>
          <div className="create_product_input_box">
            <label htmlFor="description">Description *</label>
            <textarea
              type="text"
              name="description"
              maxLength="300"
              value={description}
              placeholder="Description"
              rows="3"
              onChange={onChange}
              required
            />
          </div>
        </div>

        <div className="create_product_form_extra">
          <div className="create_product_extra  create_small">
            <label htmlFor="price">Price ($) *</label>
            <input
              type="text"
              name="price"
              placeholder="Price"
              onChange={onChange}
              required
            />
          </div>
          <div className="create_product_extra  create_small">
            <label htmlFor="countInStock">Product Count *</label>
            <input
              type="number"
              name="countInStock"
              placeholder="Product Count"
              min="0"
              onChange={onChange}
              required
            />
          </div>

          <div className="create_product_extra create_small">
            <label htmlFor="category">Category *</label>
            <select name="category" id="category" onChange={onChange} required>
              <option defaultValue="">Choose Category</option>
              <option value="skin care">Skin Care</option>
              <option value="body & hair">Body & Hair</option>
            </select>
          </div>
          <div className="create_product_extra">
            <label htmlFor="bestSeller">Best Seller</label>
            <input
              type="checkbox"
              id="bestSeller"
              name="bestSeller"
              className="create_product_checkbox"
              onChange={onChange}
            />
          </div>
          <div className="create_product_input_box">
            <label htmlFor="imageUrl">Product Image (.jpg) *</label>
            <input
              type="text"
              name="imageUrl"
              placeholder="Link to the product image"
              value={imageUrl}
              onChange={onChange}
              required
            />
            {imageUrl && <img src={imageUrl} alt="img" />}
          </div>
          {loading && (
            <div className="create_product_loading">
              <LoadingBox />
            </div>
          )}
          {error && (
            <div className="create_product_error">
              <ErrorMessage>{error}</ErrorMessage>
            </div>
          )}
          <div className="create_product_button">
            <button type="submit">Create</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateProductScreen;
