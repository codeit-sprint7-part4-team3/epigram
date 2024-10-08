import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Set-Cookie', [
    serialize('accessToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: -1,
      sameSite: 'strict',
      path: '/',
    }),
    serialize('refreshToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: -1,
      sameSite: 'strict',
      path: '/',
    }),
  ]);

  res.status(200).json({ message: '토큰이 삭제되었습니다.' });
}
