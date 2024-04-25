// router.js
import { createBrowserRouter } from "react-router-dom";
import routes from "./PrivateRouter";
import Login from "../screens/login/Login";
import Register from "../screens/register/Register";
import publicRoutes from "./PublicRouter";

const router = createBrowserRouter([
  ...publicRoutes,
  ...routes,
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> }
]);

export default router;