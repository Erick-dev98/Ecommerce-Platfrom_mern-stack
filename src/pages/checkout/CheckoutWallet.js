import React, { useEffect } from "react";
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

const CheckoutWallet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  console.log(user);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartItems = useSelector(selectCartItems);
  const shippingAddress = useSelector(selectShippingAddress);
  const paymentMethod = useSelector(selectPaymentMethod);

  const [urlParams] = useSearchParams();
  const payment = urlParams.get("payment");

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
  }, [cartItems, dispatch]);

  // Save order to Order History
  const saveOrder = async () => {
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
    dispatch(createOrder(formData));
    navigate("/checkout-success");
  };

  useEffect(() => {
    if (payment === "successful" && cartTotalAmount > 0) {
      toast.success("Payment successful");
      saveOrder();
    }
    if (payment === "failed") {
      toast.success("Payment Failed, please try again later");
    }
  }, [payment, cartTotalAmount]);

  const handleSubmit = () => {};

  function makePayment() {}

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

              <button
                type="button"
                className={styles.button}
                onClick={makePayment}
              >
                Pay Now
              </button>
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutWallet;
