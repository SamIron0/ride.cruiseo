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
const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};

interface ListingClientProps {
  listing: Destination;
}

const ListingClient: React.FC<ListingClientProps> = ({ listing }) => {
  const [destination, setDestination] = useState<Destination | undefined>();
  const { allListings, prices, userDetails } = useListings();

  // all aactive pricees for this listing
  const [allActivePrices, setAllActivePrices] = useState<any>([]);
  // Assuming you want to set destination based on a condition
  useEffect(() => {
    if (allListings) {
      const data = allListings.filter(
        (destination) => destination.id === listing.id
      );
      setDestination(data[0]); // Assuming there is only one matching destination
    }
  }, [allListings]);

  const router = useRouter();

  const category = '';
  const options: any = [];

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(parseInt(listing.price || '0'));

  const onCreateReservation = async () => {
    setIsLoading(true);
    const newTrip: Trip = {
      id: uuidv4(),
      origin: 'origin',
      destination_id: listing.id,
      user_ids: ['1234', '12345'],
      date: 'date',
      price: '10',
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
  useEffect(() => {
    // get all trips prices from  listing
    listing?.activeTrips?.forEach((trip) => {
      options.push([trip.price, trip.date, trip.id]); // push price andid
    });

    // filter out all trips that are not accessiblle for this user

    //---------------------------------------------------------------------------------------------

    // if trip orgin is not with 5 km of destination and trip origin is not with 5 km of users geolocation and ...
    //

    const userGeoCode = userDetails?.geolocation;

    // now add all prices to the users price and get the final price by applying discount
    const discount = 0.3;
    const data: any = [];
    console.log('options', options);
    options?.forEach((option: any) => {
      const price = option[0];
      const date = option[1];
      const id = option[2];
      const priceInt = parseInt(price, 10);
      const userPrice = (priceInt + parseInt(prices.get(destination?.id))) * (1 - discount);
      data.push([userPrice, date, id]);
      // setTotalPrice(userPrice)
    });

    //return aray containing all available trips and their prices
    setAllActivePrices(data);
  }, []);

  return (
    <Container>
      <div
        className="
          max-w-screen-lg 
          mx-auto
          pt-24
        "
      >
        <div className="flex flex-col gap-6">
          <ListingHead
            title={destination?.name}
            imageSrc={destination?.photo}
            locationValue={destination?.address}
            id={destination?.id}
          />
          <a className="flex  bg-black items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 shadow-md border-gray-200 hover:shadow-lg">
            {allActivePrices.map((price: any) => (
              <div className="w-full py-6 text-white rounded-lg">
                <span>
                  price:{' '}
                  {prices.get(destination?.id) ? price[0] : <>loading price </>}
                </span>
                <span>date: {price[1]}</span>
                <span>id: {price[2]}</span>
              </div>
            ))}
          </a>

          <button
            className="w-full py-2 px-4 bg-blue-500 text-md"
            onClick={onCreateReservation}
          >
            Reserve
          </button>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
