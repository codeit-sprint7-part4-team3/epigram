import { BASE_URL } from '@/constants/apiConstants';
import axios from 'axios';
import cookie from 'cookie';
import type { NextApiRequest } from 'next';

export const fetchWithAuth = async (
  req: NextApiRequest,
  endpoint: string,
  method = 'GET',
  body = null
) => {
  const cookies = cookie.parse(req.headers.cookie || '');
  const accessToken = cookies.accessToken;

  if (!accessToken) {
    throw new Error('Unauthorized');
  }

  const config: any = {
    method,
    url: `${BASE_URL}${endpoint}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  if (body) {
    config.data = body;
  }

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw new Error('API 요청 실패');
  }
};
