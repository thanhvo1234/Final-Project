import { createBrowserRouter, Outlet } from "react-router-dom";
import routes from "./PrivateRouter";
import Login from "../screens/login/Login";
import Register from "../screens/register/Register";
import ShopCategory from "../screens/shopCategory/ShopCategory";
import Product from "../screens/Product";
import Cart from "../screens/Cart";
import men_banner from "../assets/banner_mens.png"
import women_banner from "../assets/banner_women.png"
import kid_banner from "../assets/banner_kids.png"
import MainLayout from "../MainLayout";



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <div>Not found</div>,
    children: [...routes],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  
  
  
  
  
]);

export default router;