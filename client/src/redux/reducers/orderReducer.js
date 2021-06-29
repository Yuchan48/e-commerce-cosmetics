import * as actionTypes from "../constants/orderConstant";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ORDER_CREATE_REQUEST:
      return { loading: true };
    case actionTypes.ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case actionTypes.ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case actionTypes.ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case actionTypes.ORDER_DETAILS_REQUEST:
      return { loading: true };
    case actionTypes.ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case actionTypes.ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ORDER_PAY_REQUEST:
      return { loading: true };
    case actionTypes.ORDER_PAY_SUCCESS:
      return { loading: false, success: action.payload };
    case actionTypes.ORDER_PAY_FAIL:
      return { loading: false, error: action.payload };
    case actionTypes.ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const orderListUserReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case actionTypes.ORDER_LIST_USER_REQUEST:
      return { loading: true };
    case actionTypes.ORDER_LIST_USER_SUCCESS:
      return { loading: false, orders: action.payload };
    case actionTypes.ORDER_LIST_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderListAdminReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case actionTypes.ORDER_LIST_ADMIN_REQUEST:
      return { loading: true };
    case actionTypes.ORDER_LIST_ADMIN_SUCCESS:
      return { loading: false, orders: action.payload };
    case actionTypes.ORDER_LIST_ADMIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderDeliveredReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ORDER_DELIVERED_REQUEST:
      return { loading: true };
    case actionTypes.ORDER_DELIVERED_SUCCESS:
      return { loading: false, success: action.payload };
    case actionTypes.ORDER_DELIVERED_FAIL:
      return { loading: false, error: action.payload };
    case actionTypes.ORDER_DELIVERED_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ORDER_DELETE_REQUEST:
      return { loading: true };
    case actionTypes.ORDER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case actionTypes.ORDER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case actionTypes.ORDER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
