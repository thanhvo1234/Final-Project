/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
// PublicRoutes.js
import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/navbar/Navbar";
import Homepage from "../screens/home/homePage";


const PublicRoutes = () => {
  return (
    <>
      <Navbar />
      <Outlet />
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
    ],
  },
];

export default publicRoutes;