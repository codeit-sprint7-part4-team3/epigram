import { handleAuth } from '@/pages/api/auth/handleAuth';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function signInHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return handleAuth(req, res, 'auth/signIn', '로그인에 성공했습니다.');
}
