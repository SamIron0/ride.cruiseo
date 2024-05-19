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
  const fetchDestinationsData = async () => {
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
        //await fetchDestinationsData();
      }
    })();
  }, []);
  return <>{children}</>;
}
