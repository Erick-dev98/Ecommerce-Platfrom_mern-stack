import styles from "./ProductDetails.module.scss";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  DECREASE_CART,
  selectCartItems,
} from "../../../redux/features/product/cartSlice";
import Card from "../../card/Card";
// import StarsRating from "react-star-rate";
import { Spinner } from "../../loader/Loader";
import { getProduct } from "../../../redux/features/product/productSlice";
import DOMPurify from "dompurify";
import StarsRating from "react-star-rate";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const { product, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  const cart = cartItems.find((cart) => cart._id === id);
  const isCartAdded = cartItems.findIndex((cart) => {
    return cart._id === id;
  });

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };
  console.log(product);

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Product Details</h2>
        <div>
          <Link to="/shop">&larr; Back To Products</Link>
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={product?.image[0]} alt={product?.name} />
              </div>
              <div className={styles.content}>
                <h3>{product?.name}</h3>
                <p className={styles.price}>{`$${product?.price}`}</p>
                <p>
                  <b>SKU:</b> {product?.sku}
                </p>
                <p>
                  <b>Category : </b> {product?.category}
                </p>
                <p>
                  <b>Brand</b> {product?.brand}
                </p>
                <p>
                  <b>Quantity in stock : </b> {product?.quantity}
                </p>

                <div className={styles.count}>
                  {isCartAdded < 0 ? null : (
                    <>
                      <button
                        className="--btn"
                        onClick={() => decreaseCart(product)}
                      >
                        -
                      </button>
                      <p>
                        <b>{cart.cartQuantity}</b>
                      </p>
                      <button
                        className="--btn"
                        onClick={() => addToCart(product)}
                      >
                        +
                      </button>
                    </>
                  )}
                </div>
                <button
                  className="--btn --btn-danger"
                  onClick={() => addToCart(product)}
                >
                  ADD TO CART
                </button>
                <hr />
                <p>
                  <b>Product Description:</b>
                </p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(product?.description),
                  }}
                ></div>
                <hr />
              </div>
            </div>
          </>
        )}
        <Card cardClass={styles.card}>
          <h3>Product Reviews</h3>
          <div>
            {product?.ratings.length === 0 ? (
              <p>There are no reviews for this product yet.</p>
            ) : (
              <>
                {product?.ratings.map((item, index) => {
                  const { rate, review, reviewDate, name, useID } = item;
                  return (
                    <div key={index} className={styles.review}>
                      <StarsRating value={rate} />
                      <p>{review}</p>
                      <span>
                        <b>{reviewDate}</b>
                      </span>
                      <br />
                      <span>
                        <b>by: {name}</b>
                      </span>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ProductDetails;
