'use client';

import Image from 'next/image';

import Heading from '../Heading';
import HeartButton from '../HeartButton';
import { User } from '@supabase/supabase-js';

interface ListingHeadProps {
  title: string | undefined;
  imageSrc: string | undefined;
  id: string | undefined;
  locationValue: string | undefined;
  currentUser?: User | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  imageSrc,
  id,
  currentUser,
  locationValue
}) => {
  return (
    <>
    <button
  type="button"
  className="max-w-sm flex items-center justify-center px-5 py-2 text-sm text-gray-700 transition-all duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700 hover:scale-105 active:scale-90"
>
        <svg
          className="w-5 h-5 rtl:rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
          />
        </svg>
        <span>Go back</span>
      </button>
      <Heading title={title ? title : 'title'} subtitle={locationValue} />
      <div
        className="
          w-full
          h-[27vh]
          overflow-hidden 
          rounded-xl
          relative
        "
      >
        <Image
          src={imageSrc || ''}
          fill
          className="object-cover w-full"
          alt="Image"
        />
        <div
          className="
            absolute
            top-5
            right-5
          "
        >
          <HeartButton listingId={id as string} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
