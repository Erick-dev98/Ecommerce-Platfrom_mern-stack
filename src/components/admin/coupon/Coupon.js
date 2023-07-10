import React from "react";
import CreateCoupon from "./CreateCoupon";
import CouponList from "./CouponList";
import "./Coupon.scss";

const Coupon = () => {
  return (
    <section>
      <div className="container coupon">
        <CouponList />
        <CreateCoupon />
      </div>
    </section>
  );
};

export default Coupon;
