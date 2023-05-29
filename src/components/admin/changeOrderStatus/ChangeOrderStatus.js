import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ChangeOrderStatus.module.scss";
import { Spinner } from "../../loader/Loader";
import Card from "../../card/Card";
import { useDispatch } from "react-redux";
import { updateOrderStatus } from "../../../redux/features/product/orderSlice";
import { useSelector } from "react-redux";

const ChangeOrderStatus = ({ order, id }) => {
  const [status, setStatus] = useState("");
  const { isLoading } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editOrder = async (e, id) => {
    e.preventDefault();
    const formData = {
      orderStatus: status,
    };

    await dispatch(updateOrderStatus({ id, formData }));
  };

  return (
    <>
      {isLoading && <Spinner />}

      <div className={styles.status}>
        <Card cardClass={styles.card}>
          <h4>Update Status</h4>
          <form onSubmit={(e) => editOrder(e, id)}>
            <span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="" disabled>
                  -- Choose one --
                </option>
                <option value="Order Placed...">Order Placed...</option>
                <option value="Processing...">Processing...</option>
                <option value="Shipped...">Shipped...</option>
                <option value="Delivered">Delivered</option>
              </select>
            </span>
            <span>
              <button type="submit" className="--btn --btn-primary">
                Update Status
              </button>
            </span>
          </form>
        </Card>
      </div>
    </>
  );
};

export default ChangeOrderStatus;
