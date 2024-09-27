import instance from '@/api/comments/axios';
import { parse } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookies = parse(req.headers.cookie || '');
  const accessToken = cookies.accessToken;

  if (!accessToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { endpoint, method = 'GET', data = {} } = req.body;
  const allowedEndpoints = [
    '/users',
    '/oauthApps',
    '/images',
    '/epigrams',
    '/emotionLogs',
    'comments',
    'auth',
  ];

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
