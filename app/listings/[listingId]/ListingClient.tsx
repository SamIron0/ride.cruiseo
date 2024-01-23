'use client';

import axios from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Range } from 'react-date-range';
import { useRouter } from 'next/navigation';
import { differenceInDays, eachDayOfInterval } from 'date-fns';

import { Destination, UserDetails } from '@/types';

import Container from '@/components/Container';
import ListingHead from '@/components/listings/ListingHead';
import ListingInfo from '@/components/listings/ListingInfo';
import { useListings } from '@/app/providers/ListingProvider';
import { User } from '@supabase/supabase-js';
import ListingReservation from '@/components/listings/ListingReservation';
const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};

interface ListingClientProps {
  listing: Destination;
  currentUser?: User | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser
}) => {
  const [destination, setDestination] = useState<Destination | undefined>();
  const { allListings, prices } = useListings();

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
  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    return dates;
  }, []);

  const category = '';
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
    setIsLoading(true);

    axios
      .post('/api/reservations', {
        totalPrice,
        date: dateRange,
        listingId: listing?.id
      })
      .then(() => {
        toast.success('Listing reserved!');
        setDateRange(initialDateRange);
        router.push('/trips');
      })
      .catch(() => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [totalPrice, dateRange, listing?.id, router, currentUser]);
  const options: any = [];
  // get  price specific to this user for each active trip to the given destination

  function getPrice() {
    // get all trips prices from  listing
    listing?.activeTrips?.forEach((trip) => {
      options.push([trip.price, trip.id]); // push price andid
    });

    // now add all prices to the users price and get the final price by applying discount
    const discount = 0.3;
    const data: any = [];
    options?.forEach((option: any) => {
      const price = option[0];
      const id = option[1];
      const userPrice = (price + totalPrice) * (1 - discount);
      data.push([userPrice, id]);
    });

    //return aray containing all available trips and their prices
    return data;
  }

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && listing.price) {
        setTotalPrice('dayCount * listing.price');
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

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
            currentUser={currentUser}
          />
          <ListingInfo
            description={'destination?.description'}
            listing={destination}
          />
          <div
            className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
            "
          >
            <ListingReservation
              price={prices.get(destination?.id)}
              onChangeDate={(value) => setDateRange(value)}
              dateRange={dateRange}
              onSubmit={onCreateReservation}
              disabled={isLoading}
              disabledDates={disabledDates}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
