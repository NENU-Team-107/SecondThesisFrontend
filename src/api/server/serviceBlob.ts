// 封装axios
import { useAccessTokenStore } from '@/store/accessToken';
import { useSiteInfoStore } from '@/store/siteInfo';
import axios from 'axios';
const baseUrl = useSiteInfoStore().getBaseUrl();
// 创建axios实例
const service = axios.create({
    baseURL: baseUrl, // api的base_url
    timeout: 5000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
    config => {
        // Do something before request is sent
        // config.headers['Content-Type'] = 'application/json;charset=UTF-8';
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
        // response.config.headers['responseType'] = 'blob';
        return response.data;
    },
    error => {
        return Promise.reject(error);
    }
);

export default service;