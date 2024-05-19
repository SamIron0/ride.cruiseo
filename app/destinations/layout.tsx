'use client';
import getListings from '@/db/listings';
import { ReactNode } from 'react';
import { useListings } from '../providers/ListingProvider';

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
  const { setAllListings } = useListings();
  const userGeo = await fetchLocation();
  const data = await getListings(userGeo);
  setAllListings(data);

  return <>{children}</>;
}
