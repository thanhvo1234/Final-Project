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
import ManageCategory from "../screens/manageCategory/listCategory/ManageCategory";
import EditCategory from "../screens/manageCategory/editCategory/EditCategory";
import EditProduct from "../screens/manageProduct/editProduct/EditProduct";




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
      { path: "/manageProducts/productDetail/:id",
      element: <EditProduct />
      },
      {
        path: "/manageCategories",
        element: <ManageCategory />,
      },
      { path: "/manageCategories/categoryDetail/:id",
      element: <EditCategory />
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