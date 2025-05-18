'use server';

import { z } from 'zod';
import { AuthError } from 'next-auth';
import { PrismaClient } from '@prisma/client';

import { signIn } from '@/auth';
import { hashPassword } from '@/lib/utils';

const prisma = new PrismaClient();

type LoginState = {
  email?: string;
  message?: string;
  password?: string;
  errors?: { email?: string[]; password?: string[] };
};

type SignupState = {
  name?: string;
  email?: string;
  message?: string;
  password?: string;
  errors?: { name?: string[]; email?: string[]; password?: string[] };
};

const loginSchema = z.object({
  email: z.string().email({ message: 'Email should be valid.' }),
  password: z.string().min(1, { message: 'Password should be valid.' })
});

const signupSchema = z.object({
  email: z.string().email({ message: 'Email should be valid.' }),
  password: z.string().min(1, { message: 'Password should be valid.' }),
  name: z.string().min(3, { message: 'Should be atleast 3 characters.' })
});

export async function login(
  _: unknown,
  formData: FormData
): Promise<LoginState | undefined> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const result = loginSchema.safeParse({ email, password });

  if (!result.success) {
    return {
      email,
      password,
      errors: result.error.flatten().fieldErrors
    };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirect: true,
      // redirectTo: '/dashboard',
      callbackUrl: '/dashboard'
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { message: 'Invalid email or password.' };

        default:
          return { message: 'Something went wrong.' };
      }
    }

    throw error;
  }

  return { email, password };
}

export async function signup(
  _: unknown,
  formData: FormData
): Promise<SignupState | undefined> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const result = signupSchema.safeParse({ name, email, password });

  if (!result.success) {
    return {
      name,
      email,
      password,
      errors: result.error.flatten().fieldErrors
    };
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (user) {
    return {
      name,
      email,
      password,
      message: 'Email already exist.'
    };
  }

  await prisma.user.create({
    data: { name, email, password: hashPassword(password) }
  });

  return { name, email, password };
}
