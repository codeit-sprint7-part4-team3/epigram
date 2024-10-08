import cookie from 'cookie';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const cookies = cookie.parse(req.headers.get('cookie') || '');
  const accessToken = cookies.accessToken;

  const { pathname } = req.nextUrl;

  if (!accessToken && !['/signin', '/signup'].includes(pathname)) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  if (accessToken && ['/signin', '/signup', '/'].includes(pathname)) {
    return NextResponse.redirect(new URL('/epigrams', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/signin',
    '/signup',
    '/feed/:path*',
    '/epigrams/:path*',
    '/addepigram',
    '/mypage',
  ],
};
