'use client';
import { ReactNode, useEffect } from 'react';
import { useSupabase } from '../supabase-provider';
import { useRouter } from 'next/navigation';

interface ListingsLayoutProps {
  children: ReactNode;
}

export default function ListingsLayout({ children }: ListingsLayoutProps) {
  const router = useRouter();
  const { supabase } = useSupabase();

  return <>{children}</>;
}
