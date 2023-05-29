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

const CheckoutFlutterwave = () => {
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

  function makePayment() {
    // eslint-disable-next-line no-undef
    FlutterwaveCheckout({
      public_key: process.env.REACT_APP_FLW_PK,
      tx_ref: "shopito-48981487343MDI0NzMx",
      amount: cartTotalAmount,
      currency: "USD",
      payment_options: "card, banktransfer, ussd",
      redirect_url: "http://localhost:5000/response",
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
              <h3>Flutterwave Checkout</h3>

              {/* <button
                id="submit"
                className={styles.button}
                onClick={() => {
                  handleFlutterPayment({
                    callback: (response) => {
                      console.log(response);
                      closePaymentModal(); // this will close the modal programmatically
                    },
                    onClose: () => {},
                  });
                }}
              >
                Pay Now
              </button> */}

              {/* <FlutterWaveButton {...fwConfig} /> */}
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

export default CheckoutFlutterwave;
