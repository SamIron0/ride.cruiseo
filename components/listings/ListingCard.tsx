'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { Destination } from '@/types';
import Button from '../Button';
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
  return (
    <div
      onClick={() => router.push(`/destinations/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
            aspect-square 
                        relative 
            overflow-hidden 
            rounded-xl
            w-full
            h-[130px]
            border-[1px]
            border-[#232325]
          "
        >
          <Image
            fill
            className="
              object-cover 
            "
            src={data.photo}
            alt="Listing"
          />
         
        </div>

        <p className="block text-sm font-sans antialiased font-semibold leading-relaxed text-inherit">
          {address(data.name)}
        </p>
        <p className="block text-sm font-sans antialiased font-light leading-relaxed text-inherit">
          {address(data.address)}
        </p>

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
