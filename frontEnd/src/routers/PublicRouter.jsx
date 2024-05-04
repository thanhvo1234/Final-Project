/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
// PublicRoutes.js
import React from "react";
import { Outlet } from "react-router-dom";
import Product from "../screens/Product";
import Navbar from "../components/navbar/Navbar";
import Homepage from "../screens/home/homePage";
// import { Footer } from "antd/es/layout/layout";
import Footer from "../components/footer/Footer";
import ShoppingCart from "../screens/cartAction/ShoppingCart";
import ShippingAddress from "../screens/cartAction/ShippingAddress";
import PreviewOrder from "../screens/cartAction/PreviewOrder";
import OrderDetail from "../screens/orderAction/OrderDetail";
import Profile from "../screens/profile/Profile";


const PublicRoutes = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const publicRoutes = [
  {
    path: "/",
    element: <PublicRoutes />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      { 
        path: "/productDetail/:sku",
        element: <Product />
      },
      { path: "/cart",
       element: <ShoppingCart /> },

      { path: "/shippingAddress",
       element: <ShippingAddress /> },

      { path: "/previewOrder",
       element: <PreviewOrder /> },

      { path: "/profile/:id", 
      element: <Profile /> },


      { path: "/order/:id", 
      element: <OrderDetail />  }
    ],
  },
];

export default publicRoutes;