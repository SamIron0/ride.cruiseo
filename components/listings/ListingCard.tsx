'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { Destination } from '@/types';
import HeartButton from '../HeartButton';
import Button from '../Button';
import ClientOnly from '../ClientOnly';
import { useListings } from '@/app/providers/ListingProvider';
interface ListingCardProps {
  data: Destination;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: any | null;
}


const ListingCard: React.FC<ListingCardProps> = ({
  data,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser
}) => {
  const router = useRouter();
  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  function address(address: string) {
    // Define a regular expression pattern to capture everything before the street name
    const pattern: RegExp = /(.+?)\s+\b\w{2}\b\s+\w{1}\d\w{1}\s*\d\w{1}\d\s*,?/;

    // Use the pattern to find the match in the input string
    const match: RegExpExecArray | null = pattern.exec(address);

    // Extract the portion before the street name and remove trailing comma if present
    const result: string = match ? match[1].replace(/,\s*$/, '') : address;

    return result;
  }
  const { prices, setPrices } = useListings();
  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer  group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
            border-[1px]
          "
        >
          <Image
            fill
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={data.photo}
            alt="Listing"
          />
          <div
            className="
            absolute
            top-3
            right-3
          "
          >
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>

        <p className="block text-sm font-sans antialiased font-semibold leading-relaxed text-inherit">
          {address(data.name)}
        </p>
        <p className="block text-sm font-sans antialiased font-light leading-relaxed text-inherit">
          {address(data.address)}
        </p>
        {prices.get(data.id) ? (
          <div className="flex flex-row items-center gap-1">
            <div className="font-semibold">{prices.get(data.id)}</div>
          </div>
        ) : (
          <div className="max-w-sm animate-pulse">
            <div className="h-5 bg-gray-100 rounded-md dark:bg-gray-700 w-11"></div>
          </div>
        )}
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
