import React, { Suspense } from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import axios from "axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {Spin} from "antd";
import router from "./routers/Router";



const BASE_URL = import.meta.env.VITE_BASE_URL_API;
axios.defaults.baseURL = BASE_URL;

const queryClient = new QueryClient();



ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Suspense fallback={<Spin/>}>
      <RouterProvider router={router}/>
    </Suspense>
  </QueryClientProvider>
)
