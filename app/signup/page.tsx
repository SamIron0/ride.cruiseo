import { getSession } from '@/app/supabase-server';
import AuthUI from './SignUpAuthUI';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import SignUpAuthUI from './SignUpAuthUI';

export default async function SignIn() {
  const session = await getSession();
  if (session) {
    return redirect('/');
  }
  return <SignUpAuthUI />;
}
