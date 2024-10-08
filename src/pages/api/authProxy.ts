import instance from '@/api/instance/axios';
import { allowedEndpoints } from '@/constants/apiConstants';
import { parse, serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookies = parse(req.headers.cookie || '');
  let accessToken = cookies.accessToken;
  const refreshToken = cookies.refreshToken;

  if (!accessToken && refreshToken) {
    try {
      const refreshResponse = await instance.post('auth/refresh-token', {
        refreshToken,
      });

      accessToken = refreshResponse.data.accessToken;
      res.setHeader('Set-Cookie', [
        serialize('accessToken', accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 60 * 30,
          sameSite: 'strict',
          path: '/',
        }),
      ]);
    } catch (error) {
      return res
        .status(401)
        .json({ message: '토큰이 만료되었습니다. 다시 로그인해주세요.' });
    }
  }

  if (!accessToken) {
    return res.status(401).json({ message: '인증되지 않은 요청입니다.' });
  }

  const { endpoint, method = 'GET', data = {} } = req.body;

  if (!allowedEndpoints.some(allowed => endpoint.startsWith(allowed))) {
    return res.status(403).json({ message: 'Forbidden endpoint' });
  }

  try {
    const apiResponse = await instance({
      url: endpoint,
      method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: method === 'POST' || method === 'PUT' ? data : undefined,
    });

    return res.status(200).json(apiResponse.data);
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || error.message || 'Unknown error';
    const statusCode = error.response?.status || 500;

    return res.status(statusCode).json({ message: errorMessage });
  }
}
