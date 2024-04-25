import axios from "axios";
import { API_URL } from "../constants/enum";

  export const getUserAPI = (params) =>
  axios.get(API_URL.USER, { params });

  export const getProductAPI = (params) =>
  axios.get(API_URL.PRODUCT, { params });

  export const getUserDetailApi = (userId, params) =>
  axios.get(`${API_URL.USER}/${userId}`, { params });

  export const getProductDetailApi = (productId, params) =>
  axios.get(`${API_URL.USER}/${productId}`, { params });

  export const getProductDetailApiBySku = (sku, params) =>
  axios.get(`${API_URL.USER}/${sku}`, { params });

  export const loginUserAPI = (params) =>{
  console.log("Request Payload:", params);
  return axios.post(`${API_URL.USER}/login`, params);
  };

  export const registerUserAPI = (params) => {
  console.log("Request Payload:", params);
  return axios.post(`${API_URL.USER}/register`, params);
  };