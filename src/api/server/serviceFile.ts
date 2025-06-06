import { useAccessTokenStore } from "@/store/accessToken";
import axios from "axios";

// const baseUrl = import.meta.env.VITE_APP_API_URL;
const baseUrl = "/api"; // 代理地址
const servicefile = axios.create({
  baseURL: baseUrl, // api的base_url
  timeout: 5000, // 请求超时时间
});

servicefile.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    // 请求头携带token
    const token = useAccessTokenStore().getAccessToken();
    if (token !== "") {
      config.headers.Authorization = token;
      return config;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

// respone拦截器
servicefile.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default servicefile;
