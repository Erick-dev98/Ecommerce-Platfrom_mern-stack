import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./OrderDetails.module.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getOrder } from "../../../redux/features/product/orderSlice";
import { Spinner } from "../../loader/Loader";
import ChangeOrderStatus from "../changeOrderStatus/ChangeOrderStatus";
import Order from "../../../pages/orderDetails/Order";

const OrderDetails = () => {
  const { id } = useParams();
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { isLoading, isError, message, order } = useSelector(
    (state) => state.order
  );

  // useEffect(() => {
  //   dispatch(getOrder(id));
  // }, [dispatch, id]);

  return (
    <>
      <Order />

      <div className="container">
        <ChangeOrderStatus order={order} id={id} />
      </div>
    </>
  );
};

export default OrderDetails;
