import NextAuth from 'next-auth';

import authConfig from '@/auth.config';

const publicRoutes = ['/', '/auth/login', '/auth/signup'];

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
};

export default NextAuth(authConfig).auth(request => {
  const isLoggedin = request.auth;
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);

  if (isPublicRoute && isLoggedin) {
    return Response.redirect(new URL('/dashboard', request.nextUrl));
  }

  if (!isPublicRoute && !isLoggedin) {
    return Response.redirect(new URL('/auth/login', request.nextUrl));
  }
});
