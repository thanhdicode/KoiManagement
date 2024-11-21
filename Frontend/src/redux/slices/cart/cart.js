import { createSlice, combineReducers } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: { cartData: [{}] },
  reducers: {
    setCartData: (state, action) => {
      state.cart = action.payload;
    },
  },
});
// export the action
export const { setCartData } = cartSlice.actions;

// combine reducer
const CartReducer = combineReducers({
  cart: cartSlice.reducer,
});

export default CartReducer;
