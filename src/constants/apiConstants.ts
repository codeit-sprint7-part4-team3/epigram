export const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'https://fe-project-epigram-api.vercel.app/7-3/';

export const allowedEndpoints = [
  '/users',
  '/oauthApps',
  '/images',
  '/epigrams',
  '/emotionLogs',
  '/comments',
  '/auth',
  '/comments',
];
