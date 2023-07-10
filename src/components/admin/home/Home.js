import React, { useEffect } from "react";
import InfoBox from "../../infoBox/InfoBox";
import styles from "./Home.module.scss";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Chart from "../../chart/Chart";
import {
  getProducts,
  selectProducts,
} from "../../../redux/features/product/productSlice";
import {
  CALC_TOTAL_ORDER_AMOUNT,
  getOrders,
  selectOrders,
  selectTotalOrderAmount,
} from "../../../redux/features/product/orderSlice";

//Icons
const earningIcon = <AiFillDollarCircle size={30} color="#b624ff" />;
const productIcon = <BsCart4 size={30} color="#1f93ff" />;
const ordersIcon = <FaCartArrowDown size={30} color="orangered" />;

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const orders = useSelector(selectOrders);
  const totalOrderAmount = useSelector(selectTotalOrderAmount);
  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts());
    }
    if (orders.length === 0) {
      dispatch(getOrders());
    }
  }, [dispatch, products, orders]);
  useEffect(() => {
    dispatch(CALC_TOTAL_ORDER_AMOUNT());
  }, [dispatch, orders]);

  return (
    <div className={styles.home}>
      <h2>Admin Home</h2>
      <div className={styles["info-box"]}>
        <InfoBox
          cardClass={`${styles.card} ${styles.card1}`}
          title={"Earnings"}
          count={`$${totalOrderAmount}`}
          icon={earningIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card2}`}
          title={"Products"}
          count={products.length}
          icon={productIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card3}`}
          title={"Orders"}
          count={orders.length}
          icon={ordersIcon}
        />
      </div>
      <div>
        <Chart />
      </div>
    </div>
  );
};

export default Home;
