import { createServerSupabaseClient } from '../supabase-server';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LoginForm from './LoginForm';

export const metadata: Metadata = {
  title: 'Login'
};

export default async function Login({ searchParams }: { searchParams: { message: string } }) {
  const supabase = createServerSupabaseClient();
  const session = (await supabase.auth.getSession()).data.session;

  if (session) {
    return redirect(`/destinations`);
  }

  return <LoginForm searchParams={searchParams} />;
}
