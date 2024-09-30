import axios from 'axios';
const baseUrl = 'http://localhost:8080/api/v1';
const servicefile = axios.create({
  baseURL: baseUrl, // api的base_url
  timeout: 5000, // 请求超时时间
});

servicefile.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    config.headers['Content-Type'] = 'multipart/form-data';
    // 请求头携带token
    if (localStorage.getItem('accessToken')) {
      const token = JSON.parse(localStorage.getItem('accessToken') as string);
      config.headers['Authorization'] = token.token;
      return config;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// respone拦截器
servicefile.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default servicefile;
