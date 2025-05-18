import NextAuth from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from '@auth/prisma-adapter';

import authConfig from '@/auth.config';

const prisma = new PrismaClient();

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  session: { strategy: 'jwt' },
  adapter: PrismaAdapter(prisma)
});
