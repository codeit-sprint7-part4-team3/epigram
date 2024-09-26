import { fetchWithAuth } from '@/lib/fetchWithAuth';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const data = await fetchWithAuth(req, '/users/me');
    return res.status(200).json(data);
  } catch (error: any) {
    error.response?.data?.message || error.message || 'Unknown error';
    const errorStatus = error.response?.status || 500;
    res.status(errorStatus).json(error.response?.data);
  }
}
