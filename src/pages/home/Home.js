import React, { useEffect } from "react";
import "./Home.scss";
import Slider from "../../components/slider/Slider";
import CarouselItem from "../../components/carousel/CarouselItem";
import { productData } from "../../components/carousel/data";
import ProductCarousel from "../../components/carousel/Carousel";
import ProductCategory from "../../components/ProductCategory/ProductCategory";
import FooterLinks from "../../components/footer/FooterLinks";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/features/product/productSlice";
import HomeInfoBox from "./HomeInfoBox";
import { motion } from "framer-motion";
// import transition from "../../transition";

const PageHeading = ({ heading, btnText }) => {
  return (
    <>
      <div className="--flex-between">
        <h2 className="--fw-thin">{heading}</h2>
        <button className="--btn"> {btnText}</button>
      </div>
      <div className="--hr" />
    </>
  );
};

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const { products } = useSelector((state) => state.product);
  const latest = products
    ?.filter((item, index) => {
      return item.quantity > 0;
    })
    ?.filter((item, index) => index < 6);

  const phones = products
    ?.filter((item, index) => {
      return item.category === "Phone";
    })
    ?.filter((item, index) => index < 6);

  const latestProducts = latest.map((item) => (
    <div key={item._id}>
      <CarouselItem
        name={item.name}
        url={item.image[0]}
        price={item.price}
        regularPrice={item.regularPrice}
        description={item.description}
        product={item}
      />
    </div>
  ));
  const phoneProducts = phones.map((item) => (
    <div key={item._id}>
      <CarouselItem
        name={item.name}
        url={item.image[0]}
        price={item.price}
        regularPrice={item.regularPrice}
        description={item.description}
        product={item}
      />
    </div>
  ));
  const productss = productData.map((item) => (
    <div key={item.id}>
      <CarouselItem
        name={item.name}
        url={item.imageurl}
        price={item.price}
        description={item.description}
      />
    </div>
  ));
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <Slider />
      <section>
        <div className="container">
          <HomeInfoBox />
          <PageHeading heading={"Latest Products"} btnText={"Shop Now >>>"} />
          <ProductCarousel products={latestProducts} />
        </div>
      </section>
      <section className="--bg-grey">
        <div className="container">
          <h3>Categories</h3>
          <ProductCategory />
        </div>
      </section>
      <section>
        <div className="container">
          <PageHeading heading={"Mobile Phones"} btnText={"Shop Now >>>"} />
          <ProductCarousel products={phoneProducts} />
        </div>
      </section>
      <FooterLinks />
    </motion.div>
  );
};

export default Home;
