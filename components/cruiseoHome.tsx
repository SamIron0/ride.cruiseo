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
      <div className="flex flex-col items-center justify-center">
        <div className="max-w-md space-y-4 px-6 sm:px-1 w-full animate-in fade-in slide-in-from-bottom-4 duration-1200 ease-in-out">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-black px-4 text-white py-2 my-2 rounded-full shadow-lg h-fit flex items-center  w-full transition-all duration-300 ease-in-out transform hover:shadow-2xl ">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
              <path fill='rgb(156 163 175)' d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>
            <p className='pl-1 text-gray-400'>Anywhere</p>
          </button>
          {isOpen && (

            <div ref={tripDropdownRef} id="dropdownInformation" className="w-5/6 md:3/5 lg:w-2/5 z-10 p-2 w-50 absolute mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 left-1/2 transform -translate-x-1/2">
              <CarpoolForm user={user} />
            </div>)}
        </div>
        <div className='max-w-full'>
          <AllTripsGrid />
        </div>
        {!user ?
          <>
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




