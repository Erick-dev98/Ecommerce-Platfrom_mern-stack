import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ProductFilter.module.scss";
import {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
} from "../../../redux/features/product/filterSlice";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { GET_PRICE_RANGE } from "../../../redux/features/product/productSlice";

const ProductFilter = () => {
  const { products, minPrice, maxPrice } = useSelector(
    (state) => state.product
  );
  // console.log(minPrice, maxPrice);
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState([50, 1500]);

  const dispatch = useDispatch();

  const allCategories = [
    "All",
    ...new Set(products?.map((product) => product.category)),
  ];
  const allBrands = [
    "All",
    ...new Set(products.map((product) => product.brand)),
  ];
  // console.log(allBrands);

  useEffect(() => {
    dispatch(GET_PRICE_RANGE({ products }));
  }, [dispatch, products]);

  useEffect(() => {
    dispatch(FILTER_BY_BRAND({ products, brand }));
  }, [dispatch, products, brand]);

  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ products, price }));
    // console.log(price);
  }, [dispatch, products, price]);

  const filterProducts = (cat) => {
    setCategory(cat);
    dispatch(FILTER_BY_CATEGORY({ products, category: cat }));
  };

  const clearFilters = () => {
    setCategory("All");
    setBrand("All");
    setPrice([minPrice, maxPrice]);
  };

  return (
    <div className={styles.filter}>
      <h4>Categories</h4>
      <div className={styles.category}>
        {allCategories.map((cat, index) => {
          return (
            <button
              key={index}
              type="button"
              className={`${category}` === cat ? `${styles.active}` : null}
              onClick={() => filterProducts(cat)}
            >
              &#8250; {cat}
            </button>
          );
        })}
      </div>
      <h4>Brand</h4>
      <div className={styles.brand}>
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          {allBrands.map((brand, index) => {
            return (
              <option key={index} value={brand}>
                {brand}
              </option>
            );
          })}
        </select>
        <h4>Price</h4>
        {/* <Range /> */}

        <div className={styles.price}>
          <Slider
            range
            marks={{
              1: `${price[0]}`,
              1000: `${price[1]}`,
            }}
            min={minPrice}
            max={maxPrice}
            defaultValue={[minPrice, maxPrice]}
            tipFormatter={(value) => `$${value}`}
            tipProps={{
              placement: "top",
              visible: true,
            }}
            value={price}
            onChange={(price) => setPrice(price)}
          />
        </div>
        <br />
        <br />
        <button className="--btn --btn-danger" onClick={clearFilters}>
          Clear Filter
        </button>
      </div>
    </div>
  );
};

export default ProductFilter;
