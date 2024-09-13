import { BASE_URL, REFRESH_TOKEN } from '@/constants/apiConstants';
import axios, { AxiosInstance } from 'axios';

const authInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

authInstance.interceptors.request.use(
  config => {
    config.headers.Authorization = `Bearer ${REFRESH_TOKEN}`; // 모든 요청에 Authorization 헤더 추가
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
export default authInstance;
