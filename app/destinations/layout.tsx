'use client';
import getListings from '@/db/listings';
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

  const fetchDestinationsData = async () => {
    const userGeo = {
      lat: 37.7749,
      lon: -122.4194
    };
    const data = await getListings(userGeo);
    setAllListings(data);
  };
  useEffect(() => {
    (async () => {
      const session = await supabase.auth.getSession();

      if (!session) {
        return router.push('/login');
      } else {
        await fetchDestinationsData();
      }
    })();
  }, []);
  return <>{children}</>;
}
