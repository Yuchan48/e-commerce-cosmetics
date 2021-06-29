import * as actionTypes from "../constants/orderConstant";
import { CART_EMPTY } from "../constants/cartConstant";
import axios from "axios";

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: actionTypes.ORDER_CREATE_REQUEST, payload: order });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.post("/api/orders", order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: actionTypes.ORDER_CREATE_SUCCESS, payload: data.order });
    dispatch({ type: CART_EMPTY });
    localStorage.removeItem("cart");
  } catch (error) {
    dispatch({
      type: actionTypes.ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: actionTypes.ORDER_DETAILS_REQUEST, payload: orderId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(`/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: actionTypes.ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actionTypes.ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrder =
  (order, paymentResult) => async (dispatch, getState) => {
    dispatch({
      type: actionTypes.ORDER_PAY_REQUEST,
      payload: { order, paymentResult },
    });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.put(
        `/api/orders/${order._id}/pay`,
        paymentResult,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      dispatch({ type: actionTypes.ORDER_PAY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: actionTypes.ORDER_PAY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listOrderUser = () => async (dispatch, getState) => {
  dispatch({ type: actionTypes.ORDER_LIST_USER_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(`/api/orders/user/list`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: actionTypes.ORDER_LIST_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actionTypes.ORDER_LIST_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listOrderAdmin = () => async (dispatch, getState) => {
  dispatch({ type: actionTypes.ORDER_LIST_ADMIN_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get("/api/orders", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: actionTypes.ORDER_LIST_ADMIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actionTypes.ORDER_LIST_ADMIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: actionTypes.ORDER_DELETE_REQUEST, payload: orderId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.delete(`/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: actionTypes.ORDER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actionTypes.ORDER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deliverOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: actionTypes.ORDER_DELIVERED_REQUEST, payload: orderId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.put(
      `/api/orders/${orderId}/deliver`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: actionTypes.ORDER_DELIVERED_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actionTypes.ORDER_DELIVERED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
