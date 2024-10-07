export const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

export const allowedEndpoints = [
  '/users',
  '/oauthApps',
  '/images',
  '/epigrams',
  '/emotionLogs',
  '/comments',
  '/auth',
];
