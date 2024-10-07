import instance from '@/api/comments/axios';
import axios from 'axios';

const signinUser = async (data: SignInRequestBody) => {
  const response = await axios.post('/api/auth/signIn', data, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });
  return response.data;
};

const signupUser = async (data: SignUpRequestBody) => {
  const response = await axios.post('/api/auth/signUp', data, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });
  return response.data;
};

export { signinUser, signupUser };
