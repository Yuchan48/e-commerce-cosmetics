import * as actionTypes from "../constants/productConstant";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case actionTypes.PRODUCT_LIST_REQUEST:
      return { loading: true };
    case actionTypes.PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case actionTypes.PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCategoryReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case actionTypes.PRODUCT_CATEGORY_REQUEST:
      return { loading: true };
    case actionTypes.PRODUCT_CATEGORY_SUCCESS:
      return { loading: false, products: action.payload };
    case actionTypes.PRODUCT_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailReducer = (
  state = { loadingDetail: true },
  action
) => {
  switch (action.type) {
    case actionTypes.PRODUCT_DETAIL_REQUEST:
      return { loadingDetail: true };
    case actionTypes.PRODUCT_DETAIL_SUCCESS:
      return { loadingDetail: false, product: action.payload };
    case actionTypes.PRODUCT_DETAIL_FAIL:
      return { loadingDetail: false, errorDetail: action.payload };
    default:
      return state;
  }
};

export const productListAllReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case actionTypes.PRODUCT_LIST_ALL_REQUEST:
      return { loading: true };
    case actionTypes.PRODUCT_LIST_ALL_SUCCESS:
      return { loading: false, products: action.payload };
    case actionTypes.PRODUCT_LIST_ALL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case actionTypes.PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case actionTypes.PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case actionTypes.PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case actionTypes.PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case actionTypes.PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case actionTypes.PRODUCT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case actionTypes.PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case actionTypes.PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case actionTypes.PRODUCT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
