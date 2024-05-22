import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createClient } from '@/lib/supabase/server';
import { createServerSupabaseClient } from '../supabase-server';
import { Metadata } from 'next';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { FormEvent } from 'react';

export const metadata: Metadata = {
  title: 'Login'
};

export default async function Login({
  searchParams
}: {
  searchParams: { message: string };
}) {
  const cookieStore = cookies();
  const supabase = createServerSupabaseClient();
  const session = (await supabase.auth.getSession()).data.session;

  if (session) {
    return redirect(`/dashboard`);
  }

  const signIn = async (formData: FormData) => {
    'use server';

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return redirect(`/login?message=${error.message}`);
    }
    return redirect(`/dashboard`);
  };

  const signUp = async (formData: FormData) => {
    'use server';

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // USE IF YOU WANT TO SEND EMAIL VERIFICATION, ALSO CHANGE TOML FILE
        // emailRedirectTo: `${origin}/auth/callback`
      }
    });

    if (error) {
      console.error(error);
      return redirect(`/login?message=${error.message}`);
    }

    return redirect('/login?message=Check email to verify account');
  };

  const handleResetPassword = async (formData: FormData) => {
    'use server';

    const origin = headers().get('origin');
    const email = formData.get('email') as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/auth/callback?next=/login/password`
    });

    if (error) {
      return redirect(`/login?message=${error.message}`);
    }

    return redirect('/login?message=Check email to reset password');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const submitter = (e.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement;
    if (submitter.name === 'login') {
      await signIn(formData);
    } else if (submitter.name === 'signup') {
      await signUp(formData);
    }
  };

  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 pt-20 sm:max-w-md">
      <span className="pb-8 text-xl">Scrapify</span>

      <form
        className="flex w-full flex-1 flex-col justify-center gap-2 text-foreground animate-in"
        onSubmit={handleSubmit}
      >
        <Label className="text-md mt-4" htmlFor="email">
          Email
        </Label>
        <Input
          className="mb-3 rounded-md border bg-inherit px-4 py-2 text-[16px]"
          name="email"
          placeholder="you@example.com"
          required
        />

        <Label className="text-md" htmlFor="password">
          Password
        </Label>
        <Input
          className="mb-6 rounded-md border bg-inherit px-4 py-2 text-[16px]"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />

        <Button
          className="mb-2 rounded-md bg-blue-700 px-4 py-2 text-white"
          type="submit"
          name="login"
        >
          Login
        </Button>

        <Button
          className="mb-2 rounded-md border border-foreground/20 px-4 py-2"
          type="submit"
          name="signup"
        >
          Sign Up
        </Button>

        {searchParams?.message && (
          <p className="mt-4 bg-foreground/10 p-4 text-center text-foreground">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
