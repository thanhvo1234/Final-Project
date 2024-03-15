import axios from "axios";
import { API_URL } from "../constants/enum";

export const getUserAPI = (params) =>
  axios.get(API_URL.USER, { params });

  export const loginUserAPI = (params) =>{
  console.log("Request Payload:", params);
  return axios.post(`${API_URL.USER}/login`, params);
};

export const registerUserAPI = (params) => {
  console.log("Request Payload:", params);
  return axios.post(`${API_URL.USER}`, params);
};