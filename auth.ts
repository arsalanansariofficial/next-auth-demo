import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

const admin = {
  password: 'admin',
  email: 'admin@admin.com'
};

const publicRoutes = ['/', '/auth/login', '/auth/signup'];

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: { signIn: '/auth/login', newUser: '/auth/signup' },
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;

        if (email === admin.email && password === admin.password) {
          return { email, password };
        }

        return null;
      }
    })
  ],
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedin = auth?.user;
      const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);

      if (isPublicRoute && isLoggedin) {
        return Response.redirect(new URL('/dashboard', request.nextUrl));
      }

      if (!isPublicRoute && !isLoggedin) {
        return Response.redirect(new URL('/auth/login', request.nextUrl));
      }

      return true;
    }
  }
});
