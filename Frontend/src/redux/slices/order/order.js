import { createSlice, combineReducers } from "@reduxjs/toolkit";

const orderRequestSlice = createSlice({
  name: "orderRequest",
  initialState: {
    total: "",
    fullname: "",
    address: "",
    email: "",
    phone: "",
  },
  reducers: {
    setOrderRequest: (state, action) => {
      state.orderRequest = action.payload;
    },
  },
});

// Export the action
export const { setOrderRequest } = orderRequestSlice.actions;
// Combine reducers
const OrderReducer = combineReducers({
  orderRequest: orderRequestSlice.reducer,
});

export default OrderReducer;
