import axios from "axios";

export const privateAPI = axios.create({
    baseURL: "http://178.128.30.60:3000",
  });
  privateAPI.interceptors.request.use((req) => {
    if (localStorage.access_token) {
      req.headers.Authorization = `Bearer ${localStorage.access_token}`;
    }
  
    return req;
  });