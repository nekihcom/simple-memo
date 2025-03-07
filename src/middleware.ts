import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET 
  });
  
  const isPublicPath = request.nextUrl.pathname === '/auth/login' || 
                      request.nextUrl.pathname === '/auth/register';

  if (isPublicPath) {
    return NextResponse.next();
  }

  if (!token && request.nextUrl.pathname.startsWith('/memos')) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('callbackUrl', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/memos/:path*',
    '/auth/login',
    '/auth/register',
  ],
}; 