import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./ReviewProducts.module.scss";
import StarsRating from "react-star-rate";
import Card from "../../components/card/Card";
import { Spinner } from "../../components/loader/Loader";
import { useDispatch } from "react-redux";
import {
  deleteReview,
  getProduct,
  reviewProduct,
} from "../../redux/features/product/productSlice";
import { toast } from "react-toastify";
import { BsTrash } from "react-icons/bs";

const ReviewProducts = () => {
  const { id } = useParams();
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const [userReview, setUserReview] = useState([]);

  const { isLoading, isError, message, product } = useSelector(
    (state) => state.product
  );
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  const submitReview = async (e) => {
    e.preventDefault();
    const today = new Date();
    const date = today.toDateString();
    if (rate === 0 || review === "") {
      return toast.error("Please enter rating and review");
    }
    const formData = {
      star: rate,
      review,
      reviewDate: date,
    };
    // console.log(formData);
    await dispatch(reviewProduct({ id, formData }));
    navigate(-1);
  };

  const delReview = async (e) => {
    const formData = {
      userID: user._id,
    };
    console.log(id);
    console.log(formData);
    await dispatch(deleteReview({ id, formData }));
    navigate(-1);
  };
  // console.log(product?.ratings);
  useEffect(() => {
    const reviewed = product?.ratings.filter((rev) => {
      return rev.userID === user?._id;
    });
    setUserReview(reviewed);
  }, [product, user]);

  return (
    <section>
      <div className="container review">
        <h2>Review Products</h2>
        {isLoading && product === null ? (
          // <img src={spinnerImg} alt="Loading..." style={{ width: "50px" }} />
          <Spinner />
        ) : (
          <>
            <p>
              <b>Product name:</b> {product?.name}
            </p>
            <img
              src={product?.image[0]}
              alt={product?.name}
              style={{ width: "100px" }}
            />
          </>
        )}
        {userReview?.length > 0 ? (
          <Card cardClass={"card"}>
            <h3>Product Reviews</h3>
            <div>
              {userReview.map((item, index) => {
                const { rate, review, reviewDate, name, userID } = item;
                return (
                  <div key={index} className="review --flex-between --p">
                    <div>
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
                    <BsTrash color="red" size={25} onClick={delReview} />
                  </div>
                );
              })}
            </div>
          </Card>
        ) : (
          <Card cardClass={"card --width-500px --p"}>
            <form onSubmit={(e) => submitReview(e)}>
              <label>Rating:</label>
              <StarsRating
                value={rate}
                onChange={(rate) => {
                  setRate(rate);
                }}
              />
              <label>Review</label>
              <textarea
                value={review}
                required
                onChange={(e) => setReview(e.target.value)}
                cols="30"
                rows="10"
              ></textarea>
              <button type="submit" className="--btn --btn-primary">
                Submit Review
              </button>
            </form>
          </Card>
        )}
      </div>
    </section>
  );
};

export default ReviewProducts;
