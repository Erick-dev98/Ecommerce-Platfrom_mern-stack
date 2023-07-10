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
import { BACKEND_URL, extractIdAndCartQuantity } from "../../utils";
import axios from "axios";
import Confetti from "react-confetti";

const CheckoutFlutterwave = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  // console.log(user);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartItems = useSelector(selectCartItems);
  const shippingAddress = useSelector(selectShippingAddress);
  const paymentMethod = useSelector(selectPaymentMethod);

  const [urlParams] = useSearchParams();
  const payment = urlParams.get("payment");
  const ref = urlParams.get("ref");
  const { coupon } = useSelector((state) => state.coupon);
  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL({ coupon: coupon }));
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
      coupon: coupon != null ? coupon : { name: "nil" },
    };
    console.log(formData);
    dispatch(createOrder(formData));
  };

  useEffect(() => {
    if (
      payment === "successful" &&
      ref === process.env.REACT_APP_TX_REF &&
      cartTotalAmount > 0
    ) {
      toast.success("Payment successful");
      saveOrder();
    }
    if (payment === "failed") {
      toast.success("Payment Failed, please try again later");
    }
    setTimeout(() => {
      if (payment === "successful" && ref === process.env.REACT_APP_TX_REF) {
        navigate("/checkout-success");
      }
    }, 5000);
  }, [payment, cartTotalAmount, navigate, ref]);

  const handleSubmit = () => {};

  function makePayment() {
    // eslint-disable-next-line no-undef
    FlutterwaveCheckout({
      public_key: process.env.REACT_APP_FLW_PK,
      tx_ref: process.env.REACT_APP_TX_REF,
      amount: cartTotalAmount,
      currency: "USD",
      payment_options: "card, banktransfer, ussd",
      redirect_url: `${process.env.REACT_APP_BACKEND_URL}/api/order/response`,
      //   meta: {
      //     consumer_id: 23,
      //     consumer_mac: "92a3-912ba-1192a",
      //   },
      customer: {
        email: user?.email,
        phone_number: user.phone,
        name: user.name,
      },
      customizations: {
        title: "Shopito Online Store",
        description: "Payment for products",
        logo: "https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg",
      },
    });
  }

  const productIDs = extractIdAndCartQuantity(cartItems);

  const payWithFlutterwave = async () => {
    const response = await axios.post(
      `${BACKEND_URL}/api/order/payWithFlutterwave`,
      {
        items: productIDs,
        userID: user._id,
      }
    );
    console.log(response.data);
    // window.open(data.url);
    window.open(response.data.data.link);
    // window.location.href = response.data.data.link;
    return response.data;
  };

  return (
    <>
      {payment === "successful" && <Confetti />}

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
                <h3>Flutterwave Checkout</h3>
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
    </>
  );
};

export default CheckoutFlutterwave;
