/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
// privateRoutes.js
import React from "react";



import ManageUser from "../screens/manageUser/listUser/ManageUser";

import ManageProduct from "../screens/manageProduct/listProduct/ManageProduct";
import Homepage from "../screens/home/homePage";
import { AdminLayout } from "../components/adminLayout/AdminLayout";


import ManageBrand from "../screens/manageBrand/listBrand/ManageBrand";
import EditBrand from "../screens/manageBrand/editBrand/EditBrand";




const PrivateRoutes = () => {
  return (
    <AdminLayout>
      <Homepage />
    </AdminLayout>
  );
};

const routes = [
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/manageUsers",
        element: <ManageUser />,
      },
      {
        path: "/manageProducts",
        element: <ManageProduct />,
      },

      {
        path: "/manageBrands",
        element: <ManageBrand />,
      },
      { path: "/manageBrands/brandDetail/:id",
      element: <EditBrand />
      },

      {
        path: "/404",
        element: <div>404</div>,
      },
    ],
  },
];

export default routes;