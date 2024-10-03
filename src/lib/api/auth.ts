import instance from '@/api/instance/axios';
import axios from 'axios';

const signinUser = async (data: SignInRequestBody) => {
  const response = await axios.post('/api/auth/signIn', data, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });
  return response.data;
};

const signupUser = async (data: SignUpRequestBody) => {
  const response = await instance.post('auth/signUp', data);
  return response.data;
};

const refreshToken = async (refreshToken: RefreshToken) => {
  const response = await instance.post('auth/refresh-token', refreshToken);
  return response.data;
};

export { signinUser, signupUser, refreshToken };
