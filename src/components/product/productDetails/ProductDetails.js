import styles from "./ProductDetails.module.scss";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  DECREASE_CART,
  saveCartDB,
  selectCartItems,
} from "../../../redux/features/product/cartSlice";
import Card from "../../card/Card";
// import StarsRating from "react-star-rate";
import { Spinner } from "../../loader/Loader";
import { getProduct } from "../../../redux/features/product/productSlice";
import DOMPurify from "dompurify";
// import StarsRating from "react-star-rate";
import { addToWishlist } from "../../../redux/features/auth/authSlice";
import StarRating from "react-star-ratings";
import { calculateAverageRating, getCartQuantityById } from "../../../utils";
import ProductRating from "../productRating/ProductRating";
import { toast } from "react-toastify";
import ProductRatingSummary from "../productRating/productRatingSummary";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const [imageIndex, setImageIndex] = useState(0);
  const { product, isLoading } = useSelector((state) => state.product);

  const slideLength = product?.image?.length;
  const nextSlide = () => {
    setImageIndex(imageIndex === slideLength - 1 ? 0 : imageIndex + 1);
  };
  let slideInterval;
  useEffect(() => {
    if (product?.image?.length > 1) {
      const auto = () => {
        slideInterval = setInterval(nextSlide, 3000);
      };
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [imageIndex, slideInterval, product]);

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
    dispatch(
      saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    );
  };

  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
    dispatch(
      saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    );
  };
  // console.log(product);
  const addWishlist = (product) => {
    const productData = {
      productId: product._id,
    };
    console.log(productData);
    dispatch(addToWishlist(productData));
  };
  const averageRating = calculateAverageRating(product?.ratings);
  // console.log(product);

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
                <img
                  src={product?.image[imageIndex]}
                  alt={product?.name}
                  className={styles.pImg}
                />
                <div className={styles.smallImg}>
                  {product?.image.map((img, index) => {
                    return (
                      <img
                        key={index}
                        src={img}
                        alt={"product"}
                        onClick={() => setImageIndex(index)}
                        className={imageIndex === index ? "activeImg" : ""}
                      />
                    );
                  })}
                </div>
              </div>
              <div className={styles.content}>
                <h3>{product?.name}</h3>

                <ProductRating
                  averageRating={averageRating}
                  noOfRatings={product?.ratings.length}
                />
                <div className="--underline"></div>
                <div className={styles.property}>
                  <p>
                    <b>Price:</b>
                  </p>
                  <p className={styles.price}>{`$${product?.price}`}</p>
                </div>
                <div className={styles.property}>
                  <p>
                    <b>SKU:</b>
                  </p>
                  <p>{product?.sku}</p>
                </div>
                <div className={styles.property}>
                  <p>
                    <b>Category: </b>
                  </p>
                  <p>{product?.category}</p>
                </div>
                <div className={styles.property}>
                  <p>
                    <b>Brand: </b>
                  </p>
                  <p>{product?.brand}</p>
                </div>
                <div className={styles.property}>
                  <p>
                    <b>Color: </b>
                  </p>
                  <p>{product?.color}</p>
                </div>
                <div className={styles.property}>
                  <p>
                    <b>Quantity in stock: </b>
                  </p>
                  <p>{product?.quantity}</p>
                </div>
                <div className={styles.property}>
                  <p>
                    <b>Sold: </b>
                  </p>
                  <p>{product?.sold}</p>
                </div>

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
                <div className="--flex-start">
                  {product?.quantity > 0 ? (
                    <button
                      className="--btn --btn-primary"
                      onClick={() => addToCart(product)}
                    >
                      ADD TO CART
                    </button>
                  ) : (
                    <button
                      className="--btn --btn-red"
                      onClick={() =>
                        toast.error("Sorry, Product is out of stock")
                      }
                    >
                      Out Of Stock
                    </button>
                  )}
                  <button
                    className="--btn --btn-danger"
                    onClick={() => addWishlist(product)}
                  >
                    ADD TO WISHLIST
                  </button>
                </div>
                <div className="--underline"></div>
                <p>
                  <b>Product Description:</b>
                </p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(product?.description),
                  }}
                ></div>
                <div className="--underline"></div>
              </div>
            </div>
          </>
        )}
        <Card cardClass={styles.card}>
          <h3>Product Reviews</h3>
          <ProductRating
            averageRating={averageRating}
            noOfRatings={product?.ratings.length}
          />
          <div className="--underline"></div>
          <div className={styles.ratings}>
            {product !== null && product?.ratings.length > 0 && (
              <ProductRatingSummary ratings={product?.ratings} />
            )}

            <div className="--m">
              {product?.ratings.length === 0 ? (
                <p>There are no reviews for this product yet.</p>
              ) : (
                <>
                  {product?.ratings.map((item, index) => {
                    const { star, review, reviewDate, name, userID } = item;
                    return (
                      <div key={index} className={styles.review}>
                        {/* <StarsRating value={star} style={{ fontSize: 10 }} /> */}
                        <StarRating
                          starDimension="20px"
                          starSpacing="2px"
                          starRatedColor="#F6B01E"
                          rating={star}
                          editing={false}
                        />
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
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ProductDetails;
