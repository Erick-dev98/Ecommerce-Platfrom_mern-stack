import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentMethod: localStorage.getItem("paymentMethod")
    ? JSON.parse(localStorage.getItem("paymentMethod"))
    : "",
  shippingAddress: localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {},
  billingAddress: localStorage.getItem("billingAddress")
    ? JSON.parse(localStorage.getItem("billingAddress"))
    : {},
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    SAVE_SHIPPING_ADDRESS(state, action) {
      // console.log(action.payload);
      state.shippingAddress = action.payload;
      // save cart to LS
      localStorage.setItem(
        "shippingAddress",
        JSON.stringify(state.shippingAddress)
      );
    },
    SAVE_BILLING_ADDRESS(state, action) {
      // console.log(action.payload);
      state.billingAddress = action.payload;
      localStorage.setItem(
        "billingAddress",
        JSON.stringify(state.billingAddress)
      );
    },
    SAVE_PAYMENT_METHOD(state, action) {
      state.paymentMethod = action.payload;
      localStorage.setItem(
        "paymentMethod",
        JSON.stringify(state.paymentMethod)
      );
    },
  },
});

export const {
  SAVE_BILLING_ADDRESS,
  SAVE_SHIPPING_ADDRESS,
  SAVE_PAYMENT_METHOD,
} = checkoutSlice.actions;

export const selectShippingAddress = (state) => state.checkout.shippingAddress;
export const selectBillingAddress = (state) => state.checkout.billingAddress;
export const selectPaymentMethod = (state) => state.checkout.paymentMethod;

export default checkoutSlice.reducer;
