'use client';
import Container from './Container';
import ListingCard from './listings/ListingCard';
import EmptyState from './EmptyState';

import getListings, { IListingsParams } from '@/app/actions/getListings';
import ClientOnly from './ClientOnly';
import { Destination } from '@/types';
import { useEffect, useState } from 'react';
import { all } from 'axios';
import { useListings } from '@/app/providers/ListingProvider';
interface GridProps {
  searchParams: IListingsParams;
  userDetails: any;
}

export function Grid({ searchParams, userDetails }: GridProps) {
  const { activeCategory } = useListings();
  const { allListings, setAllListings } = useListings();
  const { prices, setPrices } = useListings();
  const { setUserDetails } = useListings();
  setUserDetails(userDetails);
  console.log(userDetails);
  const [region, setRegion] = useState('');
  // fetch the user's location
  // useEffect(() => {
  const fetchLocation = async () => {
    try {
      const res = await fetch('api/getLocation');
      if (res.status === 200) {
        // valid response
        const data = await res.json();
        setRegion(data.location); // set the region to the
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
      await fetchLocation();
      const data = await getListings(searchParams, region);
      setAllListings(data);
    };
    getListing();
  }, []);

  // get the price of all destinatiions and store it in the state
  const getPrice = async (workerID: number, userDestination: Destination) => {
    const destinationraw = {
      address: userDestination.address,
      latitude: userDestination?.coordinates?.lat,
      longitude: userDestination?.coordinates?.lon
    };
    while (!prices.get(userDestination.id)) {
      console.log('retrying get for destnation: ',userDestination.id);
      console.log('it has price: ', prices.get(userDestination.id));
      
      try {
        const response = await fetch(
          'https://1ni3q9uo0h.execute-api.us-east-1.amazonaws.com/final',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              originraw: region,
              destinationraw: destinationraw,
              worker: workerID,
              userID: '1'
            })
          }
        );
        const result = await response.json();

        if (response.ok) {
          const responseBody = JSON.parse(result.body);

          if (responseBody.result && responseBody.result.startsWith('C')) {
            setPrices(
              (prices: Map<string, number>) =>
                new Map(prices.set(userDestination.id, responseBody.result))
            );
          } else {
            console.error('Error invoking Lambda function');
          }
        }
      } catch (error) {
        console.error(
          'An error occurred while invoking Lambda function:',
          error
        );
      }
    }
  };

  // call get price
  const runWorker = async (workerID: number, destination: Destination) => {
    if (prices.get(destination.id) ) {
      return;
    }
    await getPrice(workerID, destination);
  };

  // create x workers to call them asynchronously to get the price
  const runWorkers = async () => {
    // Assuming allListings is a context variable array of objects
    const totalListings = allListings ? allListings.length : 0;
    const workers: number[] = [1, 2];
    let nextListingIndex = 0;
    const workerPromises = workers.map(async (workerID) => {
      while (nextListingIndex < totalListings && allListings) {
        const listing = allListings[nextListingIndex++];
        await runWorker(workerID, listing);
      }
    });

    await Promise.all(workerPromises);
  };

  // call run workers
  useEffect(() => {
    const abortController = new AbortController();
    runWorkers();
    return () => abortController.abort(); // Cleanup on unmount
  }, [allListings]);

  const destination = null;
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
              ? allListings.map((listing: any) => (
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
