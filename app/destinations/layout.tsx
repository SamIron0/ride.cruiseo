'use client';
import { ReactNode, useEffect } from 'react';
import { useListings } from '../providers/ListingProvider';
import { useSupabase } from '../supabase-provider';
import { useRouter } from 'next/navigation';

interface ListingsLayoutProps {
  children: ReactNode;
}

export default function ListingsLayout({ children }: ListingsLayoutProps) {
  const { setAllListings } = useListings();
  const router = useRouter();
  const { supabase } = useSupabase();

  return <>{children}</>;
}
