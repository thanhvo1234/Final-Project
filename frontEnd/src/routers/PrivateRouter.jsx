import Navbar from "../components/navbar/Navbar";
import Homepage from "../screens/home/homePage";
import ShopCategory from "../screens/shopCategory/ShopCategory";
import Product from "../screens/Product";
import Cart from "../screens/Cart";
import men_banner from "../assets/banner_mens.png"
import women_banner from "../assets/banner_women.png"
import kid_banner from "../assets/banner_kids.png"


const routes = [
  {
    

    children: [
      
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "404",
        element: <div>404</div>,
      },
      {
        path: "/product/:productId", // Sử dụng :productId là phần động của đường dẫn
        element: <Product />
      },
      {
        path:"/mens",
        element: <ShopCategory banner={men_banner} category="men"/>
      },
      {
        path:"/womens",
        element: <ShopCategory banner={women_banner}  category="women"/>
      },
      {
        path:"/kids",
        element: <ShopCategory banner={kid_banner}  category="kid"/>
      },
      {
        path:"/cart",
        element: <Cart />
      },
      
    ],
  },
];

export default routes;