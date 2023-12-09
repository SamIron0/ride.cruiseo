'use client';

import { useSupabase } from '@/app/supabase-provider';
import { useRouter } from 'next/navigation';

import s from './Navbar.module.css';

export default function LogOutButton() {
  const router = useRouter();
  const { supabase } = useSupabase();
  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }
  return (
    <button
      onClick={handleSignOut}
      className=" flex mr-1 justify-center bg-black rounded-lg items-center">
      <p className="text-white px-4 py-1 ">Sign Out</p>
    </button>
  );
}
