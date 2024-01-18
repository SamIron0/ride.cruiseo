'use client';

import dynamic from 'next/dynamic';
import { IconType } from 'react-icons';
import Avatar from '../Avatar';
import { Destination, UserDetails } from '@/types';

const Map = dynamic(() => import('../Map'), {
  ssr: false
});

interface ListingInfoProps {
  user?: UserDetails | null;
  description: string;
  listing?: Destination;
}

export default function ListingInfo({
  user,
  description,
  listing
}: ListingInfoProps) {
  const result: string[] = [];

  function times(dates: string[] | undefined | null) {
    dates?.map((date) => {
      const originalDate = new Date(date);
      // Format the time in 12-hour format with lowercase am/pm
      const formattedTime = originalDate
        .toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        })
        .toLowerCase();
      result.push(formattedTime + ',');
    });
    //const coordinates = getByValue(locationValue)?.latlng
    return result;
  }
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
          "
        >
          <div>Booked by</div>
          <Avatar src={user?.avatar_url} />
        </div>
        <div
          className="
            flex 
            flex-row 
            items-center 
            gap-4 
            font-light
            text-neutral-500
          "
        >
          {times(listing?.times)}
        </div>
      </div>
      <hr />

      <hr />
      <div
        className="
      text-lg font-light text-neutral-500"
      >
        {description}
      </div>
      <hr />
      {/*<Map center={coordinates} />*/}
    </div>
  );
}
