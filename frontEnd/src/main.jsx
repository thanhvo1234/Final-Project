import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import React, { Suspense } from "react"; // Đảm bảo import React ở đây
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Spin } from "antd";
import router from "./routers/Router";
import  ShopContextProvider  from "./context/ShopContext"; // Đã import ShopProvider

const BASE_URL = import.meta.env.VITE_BASE_URL_API;
axios.defaults.baseURL = BASE_URL;
console.log(axios.defaults.baseURL);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <ShopContextProvider> {/* Sử dụng ShopProvider ở đây */}
      <Suspense fallback={<Spin />}>
        <RouterProvider router={router} />
      </Suspense>
    </ShopContextProvider>
  </QueryClientProvider>
);