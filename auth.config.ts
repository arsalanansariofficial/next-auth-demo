import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

const admin = {
  password: 'admin',
  email: 'admin@admin.com'
};

export default {
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
  ]
} satisfies NextAuthConfig;
