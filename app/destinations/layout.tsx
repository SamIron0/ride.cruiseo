'use client';
import getListings from '@/db/listings';
import { ReactNode, useEffect } from 'react';
import { useListings } from '../providers/ListingProvider';
import { useSupabase } from '../supabase-provider';
import { useRouter } from 'next/router';

interface ListingsLayoutProps {
  children: ReactNode;
}

export default async function ListingsLayout({
  children
}: ListingsLayoutProps) {
  const fetchLocation = async () => {
    // for now use madeup address
    const location = {
      lat: 37.7749,
      lon: -122.4194
    };
    //setRegion(location);

    // this should retrun users address.
    return location;

    //use this to get general user location
    try {
      const res = await fetch('api/getLocation');
      if (res.status === 200) {
        // valid response
        const data = await res.json();
      } else {
        console.error('An error occurred while fetching the location');
      }
    } catch (error) {
      console.error('An error occurred while fetching the location:', error);
    }
  };
  const router = useRouter();
  const { supabase } = useSupabase();

  const fetchDestinationsData = async () => {
    const { setAllListings } = useListings();
    const userGeo = await fetchLocation();
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
