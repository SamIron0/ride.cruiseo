'use client';
import Container from './Container';
import ListingCard from './listings/ListingCard';
import EmptyState from './EmptyState';
import Navbar from './navbar/NavBar';
import getListings, { IListingsParams } from '@/app/actions/getListings';
import ClientOnly from './ClientOnly';
import { Destination } from '@/types';
import { useEffect, useState } from 'react';
import { all } from 'axios';
import { useListings } from '@/app/providers/ListingProvider';
import { User } from '@supabase/supabase-js';

function editDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const d = new Array(m + 1);

  for (let i = 0; i <= m; i++) {
    d[i] = new Array(n + 1);
    d[i][0] = i;
  }

  for (let j = 0; j <= n; j++) {
    d[0][j] = j;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(
        d[i - 1][j] + 1, // deletion
        d[i][j - 1] + 1, // insertion
        d[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return d[m][n];
}
interface GridProps {
  userDetails: any;
  user: User | undefined;
}
export function Grid({ user, userDetails }: GridProps) {
  const {
    allListings,
    searchInput,
    setAllListings,
    activeCategory,
    setUserDetails
  } = useListings();
  const location = {
    lat: 37.7749,
    lon: -122.4194
  };

  userDetails.geolocation = location;
  setUserDetails(userDetails);
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
  // get al destinations from supabase and then prices
  useEffect(() => {
    const getListing = async () => {
      const userGeo = await fetchLocation();
      const data = await getListings(userGeo);
      setAllListings(data);
    };
    getListing();
  }, []);

  useEffect(() => {
    console.log(searchInput);
  }, [searchInput]);
  // get the price of all destinatiions and store it in the state

  const currentUser = null;

  // display empty state if no destinations to displaay
  if (allListings?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  const renderCards = () => {
    const category: any = activeCategory;
    // remove -----------

    return (
      <>
        {/* @ts-expect-error */}
        <Navbar user={user} />
        {allListings && (
          <div
            className="
              pt-[198px]
              grid 
              grid-cols-1 
              sm:grid-cols-2 
              md:grid-cols-3 
              lg:grid-cols-4
              xl:grid-cols-5
              2xl:grid-cols-6
              gap-7
            "
          >
            {category === 'All'
              ? allListings
                  .filter((listing: any) =>
                    listing.name
                      .toLowerCase()
                      .includes(searchInput.toLowerCase())
                  )
                  .sort((a, b) => {
                    const aScore = editDistance(
                      a.name.toLowerCase(),
                      searchInput.toLowerCase()
                    );
                    const bScore = editDistance(
                      b.name.toLowerCase(),
                      searchInput.toLowerCase()
                    );
                    return aScore - bScore;
                  })
                  .map((listing: any) => (
                    <ListingCard
                      currentUser={currentUser}
                      key={listing.id}
                      data={listing}
                    />
                  ))
              : allListings
                  .filter((listing: any) => listing.category === category)
                  .map((listing: any) => (
                    <ListingCard
                      currentUser={currentUser}
                      key={listing.id}
                      data={listing}
                    />
                  ))}
          </div>
        )}
      </>
    );
  };
  return (
    <ClientOnly>
      <Container>{renderCards()}</Container>
    </ClientOnly>
  );
}
