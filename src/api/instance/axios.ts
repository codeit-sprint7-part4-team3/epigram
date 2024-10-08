import { BASE_URL } from '@/constants/apiConstants';
import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL || 'https://fe-project-epigram-api.vercel.app/7-3/',
});

// 디버깅을 위해 추가
console.log('Axios baseURL:', instance.defaults.baseURL);

export default instance;
