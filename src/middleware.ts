import cookie from 'cookie';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const cookies = cookie.parse(req.headers.get('cookie') || '');
  const accessToken = cookies.accessToken;
  if (!accessToken) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // '/addepigram/:path*',
    // '/feed/:path*',
    // '/mypage/:path*',
    // '/main/:path*',
  ],
};
