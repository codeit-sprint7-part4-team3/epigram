import { handleAuth } from '@/pages/api/auth/handleAuth';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function signUpHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return handleAuth(req, res, 'auth/signUp', '회원가입에 성공했습니다.');
}
