import React, { useEffect } from "react";
import "../coupon/Coupon.scss";
import BrandList from "./BrandList";
import CreateBrand from "./CreateBrand";
import { useDispatch, useSelector } from "react-redux";
import {
  RESET_CAT,
  getBrands,
  getCategories,
} from "../../../redux/features/categoryAndBrand/categoryAndBrandSlice";

const Brand = () => {
  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  const reloadBrands = () => {
    dispatch(getBrands());
  };

  return (
    <section>
      <div className="container coupon">
        <CreateBrand reloadBrands={reloadBrands} />
        <BrandList brands={brands} />
      </div>
    </section>
  );
};

export default Brand;
