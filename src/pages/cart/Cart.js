import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  CLEAR_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../redux/features/product/cartSlice";
import styles from "./Cart.module.scss";
import { FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import Card from "../../components/card/Card";
import "./Radio.scss";
import { toast } from "react-toastify";
import {
  SAVE_PAYMENT_METHOD,
  selectPaymentMethod,
} from "../../redux/features/product/checkoutSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [paymentMethod, setPaymentMethod] = useState("");
  const paymentMethodRedux = useSelector(selectPaymentMethod);
  // useEffect(() => {
  //   if (paymentMethodRedux !== "") {
  //     setPaymentMethod(paymentMethodRedux);
  //   }
  // }, [paymentMethodRedux, paymentMethod]);

  const increaseCart = (cart) => {
    dispatch(ADD_TO_CART(cart));
  };

  const decreaseCart = (cart) => {
    dispatch(DECREASE_CART(cart));
  };

  const removeFromCart = (cart) => {
    dispatch(REMOVE_FROM_CART(cart));
  };

  const clearCart = () => {
    dispatch(CLEAR_CART());
  };

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [cartItems, dispatch]);

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
    // dispatch(SAVE_PAYMENT_METHOD(paymentMethod));
  };

  const setPayment = (e) => {
    e.preventDefault();
    if (paymentMethod === "") {
      return toast.error("Please select a payment method");
    }
    dispatch(SAVE_PAYMENT_METHOD(paymentMethod));

    if (isLoggedIn) {
      navigate("/checkout-details");
    } else {
      navigate("/login?redirect=cart");
    }
  };

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <>
            <p>Your cart is currently empty.</p>
            <br />
            <div>
              <Link to="/shop">&larr; Continue shopping</Link>
            </div>
          </>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cart, index) => {
                  const { _id, name, price, image, cartQuantity } = cart;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img
                          src={image[0]}
                          alt={name}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>{price}</td>
                      <td>
                        <div className={styles.count}>
                          <button
                            className="--btn"
                            onClick={() => decreaseCart(cart)}
                          >
                            -
                          </button>
                          <p>
                            <b>{cartQuantity}</b>
                          </p>
                          <button
                            className="--btn"
                            onClick={() => increaseCart(cart)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>{(price * cartQuantity).toFixed(2)}</td>
                      <td className={styles.icons}>
                        <FaTrashAlt
                          size={19}
                          color="red"
                          onClick={() => removeFromCart(cart)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className={styles.summary}>
              <button className="--btn --btn-danger" onClick={clearCart}>
                Clear Cart
              </button>
              <div className={styles.checkout}>
                <div>
                  <Link to="/shop">&larr; Continue shopping</Link>
                </div>
                <br />
                <Card cardClass={styles.card}>
                  <p>
                    <b> {`Cart item(s): ${cartTotalQuantity}`}</b>
                  </p>
                  <div className={styles.text}>
                    <h4>Subtotal:</h4>
                    <h3>{`$${cartTotalAmount.toFixed(2)}`}</h3>
                  </div>
                  <hr />
                  <p>Please choose a payment method</p>
                  <form className="--form-control" onSubmit={setPayment}>
                    <label htmlFor={"stripe"} className="radio-label">
                      <input
                        className="radio-input"
                        type="radio"
                        name={"paymentMethod"}
                        id={"stripe"}
                        value={"stripe"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <span className="custom-radio" />
                      Stripe
                    </label>
                    <label htmlFor={"flutterwave"} className="radio-label">
                      <input
                        className="radio-input"
                        type="radio"
                        name={"paymentMethod"}
                        id={"flutterwave"}
                        value={"flutterwave"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <span className="custom-radio" />
                      Flutterwave
                    </label>
                    <label htmlFor={"paypal"} className="radio-label">
                      <input
                        className="radio-input"
                        type="radio"
                        name={"paymentMethod"}
                        id={"paypal"}
                        value={"paypal"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <span className="custom-radio" />
                      Paypal
                    </label>
                    <label htmlFor={"wallet"} className="radio-label">
                      <input
                        className="radio-input"
                        type="radio"
                        name={"paymentMethod"}
                        id={"wallet"}
                        value={"wallet"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <span className="custom-radio" />
                      Wallet
                    </label>
                    <button
                      type="submit"
                      className="--btn --btn-primary --btn-block"
                    >
                      Checkout
                    </button>
                  </form>
                  <p>Tax an shipping calculated at checkout</p>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
