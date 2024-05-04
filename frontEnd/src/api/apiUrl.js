import axios from "axios";
import { API_URL } from "../constants/enum";

  export const getUserAPI = (params) =>
  axios.get(API_URL.USER, { params });

  export const getUserDetailApi = (userId, params) =>
  axios.get(`${API_URL.USER}/${userId}`, { params });

  export const updateUserAPI = (userId, params) =>
  axios.patch(`${API_URL.USER}/${userId}`, params);


  export const loginUserAPI = (params) =>{
  console.log("Request Payload:", params);
  return axios.post(`${API_URL.USER}/login`, params);
  };

  //product
  export const getProductAPI = (params) =>
  axios.get(API_URL.PRODUCT, { params });
  export const getProductDetailApi = (productId, params) =>
  axios.get(`${API_URL.PRODUCT}/${productId}`, { params });

  export const getProductDetailApiBySku = (sku, params) =>
  axios.get(`${API_URL.PRODUCT}/sku/${sku}`, { params });

  export const registerUserAPI = (params) => {
  console.log("Request Payload:", params);
  return axios.post(`${API_URL.USER}/register`, params);
  };

  export const deleteProductAPI = (productId) =>
  axios.delete(`${API_URL.PRODUCT}/${productId}`);

  export const getDetailProductAPI = (productId, params) =>
  axios.get(`${API_URL.PRODUCT}/${productId}`, { params });

  export const editProductAPI = (productId, params) =>
  axios.patch(`${API_URL.PRODUCT}/${productId}`, params);

  export const createProductAPI = (params) =>
  axios.post(API_URL.PRODUCT, params);



  //category
  export const getCategoryAPI = (params) =>
  axios.get(API_URL.CATEGORY, { params });

  export const deleteCategoryAPI = (categoryId) =>
  axios.delete(`${API_URL.CATEGORY}/${categoryId}`);

  export const getDetailCategoryAPI = (categoryId, params) =>
  axios.get(`${API_URL.CATEGORY}/${categoryId}`, { params });

  export const editCategoryAPI = (categoryId, params) =>
  axios.patch(`${API_URL.CATEGORY}/${categoryId}`, params);

  export const createCategoryAPI = (params) =>
  axios.post(API_URL.CATEGORY, params);


  //brand
  export const getBrandAPI = (params) =>
  axios.get(API_URL.BRAND, { params });

  export const deleteBrandAPI = (brandId) =>
  axios.delete(`${API_URL.BRAND}/${brandId}`);

  export const getDetailBrandAPI = (brandId, params) =>
  axios.get(`${API_URL.BRAND}/${brandId}`, { params });

  export const editBrandAPI = (brandId, params) =>
  axios.patch(`${API_URL.BRAND}/${brandId}`, params);

  export const createBrandAPI = (params) =>
  axios.post(API_URL.BRAND, params);

  //cart
  export const getCartAPI = (params) =>
  axios.get(API_URL.CART, { params });

  export const getDetailCartAPI = (cartId, params) =>
  axios.get(`${API_URL.CART}/${cartId}`, { params });

  export const addToCartAPI = (cartId, params) => {
    return axios.post(`${API_URL.CART}/${cartId}/add`, params);
  };
  export const removeCartItemFromCartAPI = (cartItemId) =>
  axios.delete(`${API_URL.CART}/${cartItemId}`);

  export const increaseProductQuantityAPI = (cartId, cartItemId) =>
  axios.post(`${API_URL.CART}/${cartId}/increase/${cartItemId}`);

export const decreaseProductQuantityAPI = (cartId, cartItemId) =>
  axios.post(`${API_URL.CART}/${cartId}/decrease/${cartItemId}`);
