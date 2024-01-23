import { getSession } from '@/app/supabase-server';
import { redirect } from 'next/navigation';
import SignUpAuthUI from './SignUpAuthUI';

export default async function SignIn() {
  const session = await getSession();
  if (session) {
    return redirect('/');
  }
  return <SignUpAuthUI />;
}
