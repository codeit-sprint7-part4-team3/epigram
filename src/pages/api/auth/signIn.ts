import instance from '@/api/comments/axios';
import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const data: SignInRequestBody = req.body;

    try {
      const response = await instance.post<SignInResponse>('auth/signIn', data);

      const { user, accessToken, refreshToken } = response.data;
      res.setHeader('Set-Cookie', [
        serialize('accessToken', accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 60 * 60,
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
      res.status(200).json({ message: '로그인에 성공했습니다.', user });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Unknown error';
      const errorStatus = error.response?.status || 500;
      res.status(errorStatus).json(error.response?.data);
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}