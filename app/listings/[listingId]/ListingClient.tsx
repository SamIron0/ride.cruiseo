'use client';

import axios from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Range } from 'react-date-range';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { Destination, Trip, UserDetails } from '@/types';
import Container from '@/components/Container';
import ListingHead from '@/components/listings/ListingHead';
import { useListings } from '@/app/providers/ListingProvider';

interface ListingClientProps {
  listing: Destination;
}

const ListingClient: React.FC<ListingClientProps> = ({ listing }) => {
  const { userDetails } = useListings();
  const [isLoading, setIsLoading] = useState(false);
  const [loadedPrices, setLoadedPrices] = useState(new Map<string, number>());
  const getPrice = async (trip: Trip) => {
    const workerID = 1;
    const destinationraw = {
      address: listing.address,
      latitude: listing?.coordinates?.lat,
      longitude: listing?.coordinates?.lon
    };

    try {
      const response = await fetch(
        'https://1ni3q9uo0h.execute-api.us-east-1.amazonaws.com/final',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            originraw: userDetails?.geolocation,
            destinationraw: destinationraw,
            worker: workerID,
            userID: userDetails?.id
          })
        }
      );
      const result = await response.json();

      if (response.ok) {
        const responseBody = JSON.parse(result.body);
        if (responseBody.result && responseBody.result.startsWith('C')) {
          const discount = 0.1;
          const fullPrice = parseFloat(
            responseBody.result.replace(/[^0-9.]/g, '')
          );
          const discountedPrice = parseFloat(
            (fullPrice * (1 - discount)).toFixed(2)
          );
          const updatedPrices = new Map(loadedPrices);
          updatedPrices.set(trip.id, discountedPrice);
          setLoadedPrices(updatedPrices);
        } else {
          console.error('Error invoking Lambda function');
        }
      }
    } catch (error) {
      console.error('An error occurred while invoking Lambda function:', error);
    }
  };
  const [selectedTrip, setSelectedTrip] = useState<Trip>({
    id: '',
    origin: '',
    destination_id: '',
    user_ids: [],
    date: 'new Date()',
    price: 0,
    status: ''
  });

  const router = useRouter();
  const onCreateReservation = async () => {
    setIsLoading(true);
    const newTrip: Trip = {
      id: uuidv4(),
      origin: userDetails?.address || '',
      destination_id: listing.id,
      user_ids: [userDetails?.id || ''],
      date: selectedTrip.date,
      price: loadedPrices.get(selectedTrip.id) || 0,
      status: 'Active'
    };
    try {
      const url = '/api/createTrip';
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTrip)
      };
      const response = await fetch(url, options);
      const data = await response.json();
      console.log('data', data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Container>
      <div
        className="
          max-w-screen-lg 
          mx-auto
          pt-24
        "
      >
        <div className="flex flex-col pb-12  gap-6">
          <ListingHead
            title={listing?.name}
            imageSrc={listing?.photo}
            locationValue={listing?.address}
            id={listing?.id}
          />
          <div className="flex flex-col items-center justify-center ">
            {listing.activeTrips?.map((trip: any) => (
              <div className="w-full md:gap-6">
                {/* Content */}
                <div
                  className="max-w-xl md:max-w-none md:w-full sm:mx-auto md:col-span-7 lg:col-span-6 md:mt-6"
                  data-aos="fade-right"
                >
                  {/* Tabs buttons */}
                  <div className="mb-8 md:mb-0 text-black">
                    <div
                      className={`flex justify-between bg-zinc-800  w-full items-center text-lg p-5 rounded  transition duration-300 ease-in-out mb-3 shadow-md  hover:shadow-lg ${
                        selectedTrip.id === trip.id
                          ? `shadow-md border-blue-500 border first-letter:hover:shadow-lg`
                          : `  border-zinc-400 hover:shadow-lg`
                      }`}
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <div className="font-bold leading-snug tracking-tight mb-1">
                            Price:
                          </div>
                          <div className="text-gray-600">
                            {loadedPrices?.get(trip.id) ? (
                              loadedPrices?.get(trip.id)
                            ) : (
                              <div className="max-w-sm animate-pulse">
                                <div className="h-5 bg-gray-100 rounded-md dark:bg-gray-700 w-11"></div>
                              </div>
                            )}
                          </div>{' '}
                        </div>

                        <div className="font-bold leading-snug tracking-tight mb-1">
                          Time:
                        </div>
                        <div className="font-bold leading-snug tracking-tight mb-1">
                          Riders:
                        </div>
                      </div>
                      <div>
                        <button
                          onClick={() => getPrice(trip)}
                          className="flex text-sm justify-center items-center px-4 py-2 bg-fuchsia-600	text-white rounded-lg shadow flex-shrink-0 ml-3"
                        >
                          Show Price
                        </button>

                        <button
                          onClick={() => setSelectedTrip(trip)}
                          className={`flex  h-4 w-4 rounded-full shadow flex-shrink-0 ml-3 ${
                            selectedTrip.id === trip.id
                              ? `
                          border-blue-500 bg-white border`
                              : `bg-zinc-800`
                          }
                        `}
                        />
                      </div>
                    </div>{' '}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className=" rounded-lg py-2 px-8 bg-blue-500 text-md"
            onClick={() => onCreateReservation()}
          >
            Reserve
          </button>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
