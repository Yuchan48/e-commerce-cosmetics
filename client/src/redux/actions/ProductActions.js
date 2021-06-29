import * as actionTypes from "../constants/productConstant";
import axios from "axios";

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.PRODUCT_LIST_REQUEST });
    const { data } = await axios.get("/api/products");

    dispatch({
      type: actionTypes.PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PRODUCT_LIST_FAIL,
      payload: error.message,
    });
  }
};

export const listAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.PRODUCT_LIST_ALL_REQUEST });
    const { data } = await axios.get("/api/products/list/allproducts");

    dispatch({
      type: actionTypes.PRODUCT_LIST_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PRODUCT_LIST_ALL_FAIL,
      payload: error.message,
    });
  }
};

export const categoryProducts = (category) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.PRODUCT_CATEGORY_REQUEST });
    const { data } = await axios.get(`/api/products/${category}`);
    dispatch({
      type: actionTypes.PRODUCT_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PRODUCT_CATEGORY_FAIL,
      payload: error.message,
    });
  }
};

export const detailProduct = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.PRODUCT_DETAIL_REQUEST, payload: id });
  try {
    const { data } = await axios.get(`/api/product/${id}`);
    dispatch({
      type: actionTypes.PRODUCT_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PRODUCT_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: actionTypes.PRODUCT_CREATE_REQUEST, payload: product });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.post("/api/product", product, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({
      type: actionTypes.PRODUCT_CREATE_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: actionTypes.PRODUCT_UPDATE_REQUEST, payload: product });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.put(`/api/product/${product._id}`, product, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: actionTypes.PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actionTypes.PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct = (productId) => async (dispatch, getState) => {
  dispatch({ type: actionTypes.PRODUCT_DELETE_REQUEST, payload: productId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    await axios.delete(`/api/product/${productId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: actionTypes.PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: actionTypes.PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
