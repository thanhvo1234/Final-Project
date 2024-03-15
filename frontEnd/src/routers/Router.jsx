import { createBrowserRouter, Outlet } from "react-router-dom";
import routes from "./PrivateRouter";
import Login from "../screens/login/Login";
import Register from "../screens/register/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
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