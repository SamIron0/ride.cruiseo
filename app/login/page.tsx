import { createServerSupabaseClient } from '../supabase-server';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LoginForm from './LoginForm';
import { createServerClient } from '@supabase/ssr';
import { Database } from '@/types_db';

export const metadata: Metadata = {
  title: 'Login'
};

export default async function Login({
  searchParams
}: {
  searchParams: { message: string };
}) {
  const cookieStore = cookies();
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        }
      }
    }
  );
  const session = (await supabase.auth.getSession()).data.session;

  if (session) {
    return redirect(`/destinations`);
  }

  return <LoginForm searchParams={searchParams} />;
}
