import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./OrderDetails.module.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getOrder } from "../../redux/features/product/orderSlice";
import { Spinner } from "../../components/loader/Loader";

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, message, order } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getOrder(id));
  }, [dispatch, id]);

  return (
    <section>
      <div className="container">
        <h2>Order Details</h2>
        <div>
          <Link to="/order-history">&larr; Back To Orders</Link>
        </div>
        <br />
        <div className="table">
          {isLoading && order === null ? (
            // <img src={spinnerImg} alt="Loading..." style={{ width: "50px" }} />
            <Spinner />
          ) : (
            <>
              <p>
                <b>Order ID</b> {order?._id}
              </p>
              <p>
                <b>Order Amount</b> ${order?.orderAmount}
              </p>
              <p>
                <b>Payment Method</b> {order?.paymentMethod}
              </p>
              <p>
                <b>Order Status</b> {order?.orderStatus}
              </p>
              <p>
                <b>Shipping Address</b>
                <br />
                Address: {order?.shippingAddress.line1},
                {order?.shippingAddress.line2}, {order?.shippingAddress.city}
                <br />
                State: {order?.shippingAddress.state}
                <br />
                Country: {order?.shippingAddress.country}
              </p>
              <br />
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
                  {order?.cartItems.map((cart, index) => {
                    const { _id, name, price, image, cartQuantity } = cart;
                    return (
                      <tr key={_id}>
                        <td>
                          <b>{index + 1}</b>
                        </td>
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
                        <td>{cartQuantity}</td>
                        <td>{(price * cartQuantity).toFixed(2)}</td>
                        <td className={"icons"}>
                          <Link to={`/review-product/${_id}`}>
                            <button className="--btn --btn-primary">
                              Review Product
                            </button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
