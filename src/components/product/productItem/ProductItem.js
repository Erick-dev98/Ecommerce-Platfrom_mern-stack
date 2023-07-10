import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./ProductItem.module.scss";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  saveCartDB,
  selectCartItems,
} from "../../../redux/features/product/cartSlice";
import Card from "../../card/Card";
import {
  calculateAverageRating,
  getCartQuantityById,
  shortenText,
} from "../../../utils";
import DOMPurify from "dompurify";
import ProductRating from "../productRating/ProductRating";
import { toast } from "react-toastify";

const ProductItem = ({
  product,
  grid,
  _id,
  name,
  price,
  description,
  image,
  regularPrice,
  ratings,
}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
    dispatch(
      saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    );
  };
  const averageRating = calculateAverageRating(product.ratings);

  return (
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
      <Link to={`/product-details/${_id}`}>
        <div className={styles.img}>
          <img src={image[0]} alt={name} />
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.details}>
          <p>
            <span>{regularPrice > 0 && <del>${regularPrice}</del>}</span>
            {` $${price} `}
          </p>
          {/* Rating */}
          <ProductRating
            averageRating={averageRating}
            noOfRatings={product?.ratings.length}
          />
          <h4>{shortenText(name, 18)}</h4>
        </div>
        {!grid && (
          // <p className={styles.desc}>{shortenText(description, 200)}</p>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                shortenText(product?.description, 200)
              ),
            }}
          ></div>
        )}

        {product?.quantity > 0 ? (
          <button
            className="--btn --btn-primary"
            onClick={() => addToCart(product)}
          >
            Add To Cart
          </button>
        ) : (
          <button
            className="--btn --btn-red"
            onClick={() => toast.error("Sorry, Product is out of stock")}
          >
            Out Of Stock
          </button>
        )}
      </div>
    </Card>
  );
};

export default ProductItem;
