'use server';

import { z } from 'zod';

type LoginState = {
  email?: string;
  password?: string;
  errors?: { email?: string[]; password?: string[] };
};

type SignupState = {
  name?: string;
  email?: string;
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

  return { name, email, password };
}
