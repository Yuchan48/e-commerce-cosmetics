import * as actionTypes from "../constants/cartConstant";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case actionTypes.CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          error: "",
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return { ...state, error: "", cartItems: [...state.cartItems, item] };
      }

    case actionTypes.CART_REMOVE_ITEM:
      return {
        ...state,
        error: "",
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    case actionTypes.CART_ADD_ITEM_FAIL:
      return { ...state, error: action.payload };

    case actionTypes.CART_EMPTY:
      return { ...state, error: "", cartItems: [] };
    case actionTypes.CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };
    case actionTypes.CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    default:
      return state;
  }
};
