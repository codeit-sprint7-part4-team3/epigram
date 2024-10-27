import { BASE_URL } from '@/constants/apiConstants';
import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL || 'https://fe-project-epigram-api.vercel.app/7-3/',
});

export default instance;
