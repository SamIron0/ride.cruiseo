'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { BiSearch } from 'react-icons/bi';
import { differenceInDays } from 'date-fns';

import useSearchModal from '@/app/hooks/useSearchModal';

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();

  const locationValue = params?.get('locationValue');
  const startDate = params?.get('startDate');
  const endDate = params?.get('endDate');
  const guestCount = params?.get('guestCount');

  const locationLabel = 'Your Location';

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }

    return 'Any Day';
  }, [startDate, endDate]);

  return (
    <div
      onClick={searchModal.onOpen}
      className="
        border-[1px] 
        border-[#232325]
                w-full 
        md:w-auto 
        py-2 
        rounded-full 
        shadow-sm 
        hover:shadow-md 
        transition 
        cursor-pointer
      "
    >
      <div
        className="
          flex 
          flex-row 
          items-center 
          justify-between
        "
      >
        <div
          className="
            text-sm 
            font-semibold 
            px-6
          text-zinc-300
          "
        >
          {locationLabel}
        </div>

        <div
          className="
            text-sm 
            pl-6 
            pr-2 
            text-zinc-400 
            flex 
            border-l-[1px]
            flex-row 
            items-center 
            gap-3
          "
        >
          <div className="hidden sm:block">{durationLabel}</div>
          <div
            className="
              p-2 
              bg-[#4169E1] 
              rounded-full 
              text-white
            "
          >
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
