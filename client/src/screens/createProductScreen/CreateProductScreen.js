import "./CreateProductScreen.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCT_CREATE_RESET } from "../../redux/constants/productConstant";
import { createProduct } from "../../redux/actions/ProductActions";

import LoadingBox from "../../component/loadingBox/LoadingBox";
import ErrorMessage from "../../component/errorMessage/ErrorMessage";

function CreateProductScreen(props) {
  const [name, setName] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [bestSeller, setBestSeller] = useState(false);
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

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

    if (typeof Number(price) !== "number") {
      alert("invalid price");
    } else if (countInStock < 0 || typeof Number(countInStock) !== "number") {
      alert("product count must be more than 0");
    } else if (category.length === 0) {
      alert("please select category");
    } else {
      dispatch(
        createProduct({
          name,
          subTitle,
          description,
          price,
          countInStock,
          category,
          bestSeller,
          imageUrl,
        })
      );
    }
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
              id="name"
              maxLength="20"
              value={name}
              onChange={(e) => setName(capitalize(e.target.value))}
              placeholder="Product Name"
              required
            />
          </div>
          <div className="create_product_input_box">
            <label htmlFor="subTitle">Subtitle *</label>
            <input
              type="text"
              id="subTitle"
              maxLength="40"
              onChange={(e) => setSubTitle(e.target.value)}
              placeholder="Subtitle"
              required
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
              onChange={(e) => setDescription(e.target.value)}
              required
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
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="create_product_extra  create_small">
            <label htmlFor="countInStock">Product Count *</label>
            <input
              type="number"
              id="countInStock"
              placeholder="Product Count"
              min="0"
              onChange={(e) => setCountInStock(e.target.value)}
              required
            />
          </div>

          <div className="create_product_extra create_small">
            <label htmlFor="category">Category *</label>
            <select
              name="category"
              id="category"
              onChange={(e) => setCategory(e.target.value)}
              required
            >
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
              className="create_product_checkbox"
              onChange={() => setBestSeller(!bestSeller)}
            />
          </div>
          <div className="create_product_input_box">
            <label htmlFor="imageUrl">Product Image (.jpg) *</label>
            <input
              type="text"
              id="imageUrl"
              placeholder="Link to the product image"
              onChange={(e) => setImageUrl(e.target.value)}
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
