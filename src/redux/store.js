import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import productReducer from "../redux/features/product/productSlice";
import filterReducer from "../redux/features/product/filterSlice";
import cartReducer from "../redux/features/product/cartSlice";
import checkoutReducer from "../redux/features/product/checkoutSlice";
import orderReducer from "../redux/features/product/orderSlice";
import transactionReducer from "../redux/features/transaction/transactionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    filter: filterReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    order: orderReducer,
    transaction: transactionReducer,
  },
});
