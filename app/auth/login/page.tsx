'use client';

import Link from 'next/link';
import { useActionState } from 'react';

import { login } from '@/lib/actions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function Page() {
  const [state, action] = useActionState(login, undefined);

  return (
    <main className="grow content-center">
      <section className="mx-auto max-w-sm">
        <form
          action={action}
          className="space-y-4 rounded-md border border-dashed p-4"
        >
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={state?.email}
              placeholder="your.name@domain.com"
            />
            {state?.errors?.email && (
              <p className="text-destructive text-xs">{state.errors.email}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password@123"
              defaultValue={state?.password}
            />
            {state?.errors?.password && (
              <p className="text-destructive text-xs">
                {state.errors.password}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <Button variant="link" className="mx-auto block p-0 text-center">
          <Link href="/auth/signup">Don&apos;t have an account? Signup</Link>
        </Button>
      </section>
    </main>
  );
}
