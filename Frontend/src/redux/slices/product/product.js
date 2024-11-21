import { createSlice, combineReducers } from "@reduxjs/toolkit";
const productSlice = createSlice({
  name: "productId",
  initialState: {
    productId: "",
  },
  reducers: {
    setProductId: (state, action) => {
      state.productId = action.payload;
    },
    getProductId: (state) => {
      return state.productId;
    },
  },
});

// Export the action
export const { setProductId, getProductId } = productSlice.actions;

// Combine reducers
const ProductReducer = combineReducers({
  productId: productSlice.reducer,
});

export default ProductReducer;
