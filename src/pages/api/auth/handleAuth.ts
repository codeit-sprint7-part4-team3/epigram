import instance from '@/api/instance/axios';
import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

export async function handleAuth(
  req: NextApiRequest,
  res: NextApiResponse,
  endpoint: string,
  successMessage: string
) {
  if (req.method === 'POST') {
    const data = req.body;

    try {
      const response = await instance.post(endpoint, data);

      const { user, accessToken, refreshToken } = response.data;
      res.setHeader('Set-Cookie', [
        serialize('accessToken', accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 60 * 30,
          sameSite: 'strict',
          path: '/',
        }),
        serialize('refreshToken', refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 60 * 60 * 24 * 7,
          sameSite: 'strict',
          path: '/',
        }),
      ]);
      res.status(200).json({ message: successMessage, user });
    } catch (error: any) {
      const errorStatus = error.response?.status || 500;
      res.status(errorStatus).json(error.response?.data);
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
