import { getSession } from '@/app/supabase-server';
import { redirect } from 'next/navigation';
import SignInAuthUI from './SignInAuthUI';

export default async function SignIn() {
  const session = await getSession();
  if (session) {
    return redirect('/');
  }
  return <SignInAuthUI />;
}
