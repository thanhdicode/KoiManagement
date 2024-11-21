import { configureStore } from "@reduxjs/toolkit";
// import reducer
import ModalReducer from "./slices/modal/modal";
import NavbarReducer from "./slices/navbar/navbar";
import AccountReducer from "./slices/account/account";
import ProductReducer from "./slices/product/product";
import KoiReducer from "./slices/koi/koi";
import CartReducer from "./slices/cart/cart";
import OrderReducer from "./slices/order/order";
export default configureStore({
  reducer: {
    // modal
    modal: ModalReducer,
    // navbar
    navbar: NavbarReducer,
    // account
    account: AccountReducer,
    // product
    product: ProductReducer,
    // koi
    koi: KoiReducer,
    // cart
    cart: CartReducer,
    // order
    order: OrderReducer,
  },
});
