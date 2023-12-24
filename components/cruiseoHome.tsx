'use client';

import Button from '@/components/ui/Button';
import { Database, Json } from '@/types_db';
import { postData } from '@/utils/helpers';
import { getStripe } from '@/utils/stripe-client';
import { Session, User } from '@supabase/supabase-js';
import cn from 'classnames';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { CarpoolCount } from './ui/carpool-count';
import { CarpoolForm } from './ui/carpool-form';
import { HowCruiseoWorks } from './how-cruiseo-works';
import { WhyChooseCruiseo } from './why-choose-cruiseo';
import { CarpoolGrid } from './ui/carpool-grid';
import { Trip, UserDetails } from '@/types';
import { HowFaresCalculated } from './how-fares-calculated';
import { AllTripsGrid } from './allTripsGrid';

type Subscription = Database['public']['Tables']['subscriptions']['Row'];
type Product = Database['public']['Tables']['products']['Row'];
type Price = Database['public']['Tables']['prices']['Row'];

interface Props {
  trips: Trip[] | null | undefined;
  user: User | null | undefined;
  userDetails: UserDetails | null;
}


export default function CruiseoHome({
  trips,
  user,
  userDetails,
}: Props) {


  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenuOnOutsideClick = (event: { target: any; }) => {
    if (isOpen && tripDropdownRef.current && !tripDropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeMenuOnOutsideClick);

    return () => {
      document.removeEventListener('click', closeMenuOnOutsideClick);
    };
  }, [isOpen]);

  const tripDropdownRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="flex flex-col pt-4 items-center justify-center">
        <div className="max-w-md space-y-4 px-6 sm:px-0.5 w-full animate-in fade-in slide-in-from-bottom-4 duration-1200 ease-in-out">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-black text-gray-400 py-3 mt-2 mb-2 rounded-full shadow-lg h-fit flex px-1 items-center w-full transition-all duration-300 ease-in-out transform hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32">
              <path d="M440-40v-80q-125-14-214.5-103.5T122-438H42v-80h80q14-125 103.5-214.5T440-836v-80h80v80q125 14 214.5 103.5T838-518h80v80h-80q-14 125-103.5 214.5T520-120v80h-80Zm40-158q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198q0 116 82 198t198 82Z" />
            </svg>
            <p className='pl-1'>Anywhere</p>
          </button>
          {isOpen && (
            <div ref={tripDropdownRef} id="dropdownInformation" className="w-5/6 md:3/5 lg:w-2/5 z-10 p-2 absolute mt-2 bg-white rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
              <CarpoolForm user={user} />
            </div>)}
        </div>
        {!user ?
          <>
            <AllTripsGrid />
            <HowCruiseoWorks />
            <HowFaresCalculated />
            <WhyChooseCruiseo />
          </> : <>
            <CarpoolGrid user={user} trips={trips} />
          </>
        }
      </div>

    </>);
}




