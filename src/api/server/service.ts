// 封装axios
import { useAccessTokenStore } from '@/store/accessToken';
import { useSiteInfoStore } from '@/store/siteInfo';
import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/v1';
// const baseUrl = useSiteInfoStore().getBaseUrl();
// const baseUrl = 'http://139.9.138.253/api/v1';
// 创建axios实例
const service = axios.create({
    baseURL: baseUrl, // api的base_url
    timeout: 5000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
    config => {
        // Do something before request is sent
        config.headers['Content-Type'] = 'application/json;charset=UTF-8';
        // 请求头携带token
        const token = useAccessTokenStore().getAccessToken();
        if (token !== '') {
            config.headers['Authorization'] = token;
            return config;
        }
        return config;
    },
    error => {
        // Do something with request error
        return Promise.reject(error);
    }
);

// respone拦截器
service.interceptors.response.use(
    response => {
        // console.log(response);
        return response;
        // return response.data;
    },
    error => {
        return Promise.reject(error);
    }
);

export default service;