import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../../components/admin/navbar/Navbar";
import styles from "./Admin.module.scss";
import Home from "../../components/admin/home/Home";
import AddProduct from "../../components/admin/addProduct/AddProduct";
import ViewProducts from "../../components/admin/viewProducts/ViewProducts";
import EditProduct from "../../components/admin/editProduct/EditProduct";
import Orders from "../../components/admin/orders/Orders";
import OrderDetails from "../../components/admin/orderDetails/OrderDetails";
import Coupon from "../../components/admin/coupon/Coupon";
import Category from "../../components/admin/category/Category";
import Brand from "../../components/admin/brand/Brand";

const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="all-products" element={<ViewProducts />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order-details/:id" element={<OrderDetails />} />
          <Route path="coupon" element={<Coupon />} />
          <Route path="category" element={<Category />} />
          <Route path="brand" element={<Brand />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
