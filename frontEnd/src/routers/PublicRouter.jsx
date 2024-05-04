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
    ],
  },
];

export default publicRoutes;