import React, { useEffect } from "react";
import "./Checkout.scss";
import styles from "../../components/checkout/checkoutForm/CheckoutForm.module.scss";
import Card from "../../components/card/Card";
import CheckoutSummary from "../../components/checkout/checkoutSummary/CheckoutSummary";
import { useSelector } from "react-redux";
import {
  CALCULATE_SUBTOTAL,
  selectCartItems,
  selectCartTotalAmount,
} from "../../redux/features/product/cartSlice";
import {
  selectBillingAddress,
  selectPaymentMethod,
  selectShippingAddress,
} from "../../redux/features/product/checkoutSlice";
import { selectUser } from "../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createOrder } from "../../redux/features/product/orderSlice";
import { toast } from "react-toastify";
import mcImg from "../../assets/mc_symbol.png";
import axios from "axios";
import { BACKEND_URL, extractIdAndCartQuantity } from "../../utils";
import { Spinner } from "./../../components/loader/Loader";

const CheckoutWallet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartItems = useSelector(selectCartItems);
  const shippingAddress = useSelector(selectShippingAddress);
  const paymentMethod = useSelector(selectPaymentMethod);

  const [urlParams] = useSearchParams();
  const payment = urlParams.get("payment");
  const { coupon } = useSelector((state) => state.coupon);
  const { isLoading } = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL({ coupon: coupon }));
  }, [cartItems, dispatch]);

  // Save order to Order History

  const today = new Date();
  const formData = {
    orderDate: today.toDateString(),
    orderTime: today.toLocaleTimeString(),
    orderAmount: cartTotalAmount,
    orderStatus: "Order Placed...",
    cartItems,
    shippingAddress,
    paymentMethod,
  };

  console.log(formData);

  // navigate("/checkout-success");

  useEffect(() => {
    if (payment === "successful" && cartTotalAmount > 0) {
      toast.success("Payment successful");
      // saveOrder();
    }
    if (payment === "failed") {
      toast.success("Payment Failed, please try again later");
    }
  }, [payment, cartTotalAmount]);

  const handleSubmit = () => {};
  const productIDs = extractIdAndCartQuantity(cartItems);

  const makePayment = async () => {
    if (cartTotalAmount < 1) {
      return toast.error("Cart amount is zero");
    }
    const response = await axios.post(
      `${BACKEND_URL}/api/order/payWithWallet`,
      {
        items: productIDs,
        cartItems,
        shippingAddress,
        coupon: coupon != null ? coupon : { name: "nil" },
      }
    );
    console.log(response.data);
    toast.success(response.data.message);
    window.location.href = response.data.url;
  };

  return (
    <section>
      <div className={`container ${styles.checkout}`}>
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <Card cardClass={styles.card}>
              <CheckoutSummary />
            </Card>
          </div>
          <div>
            <Card cardClass={`${styles.card} ${styles.pay}`}>
              <h3>Shopito Wallet Checkout</h3>
              <div className="wallet-info --card --mr">
                <span className="--flex-between">
                  <p>Account Balance</p>
                  <img alt="mc" src={mcImg} width={50} />
                </span>
                <h4>${user?.balance?.toFixed(2)}</h4>
              </div>
              <br />
              {cartTotalAmount < user?.balance?.toFixed(2) ? (
                <>
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <button
                      type="button"
                      className={styles.button}
                      onClick={makePayment}
                    >
                      Pay Now
                    </button>
                  )}
                </>
              ) : (
                <div className="--center-all">
                  <h4>Insufficient Balance!!!</h4>
                  <button
                    className="--btn --btn-danger --btn-block"
                    onClick={() => navigate("/wallet")}
                  >
                    Top Up Wallet
                  </button>
                </div>
              )}
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutWallet;
