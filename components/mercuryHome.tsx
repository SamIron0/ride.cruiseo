'use client';

import Button from '@/components/ui/Button';
import { Database, Json } from '@/types_db';
import { postData } from '@/utils/helpers';
import { getStripe } from '@/utils/stripe-client';
import { Session, User } from '@supabase/supabase-js';
import cn from 'classnames';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CarpoolCount } from './ui/carpool-count';
import { CarpoolForm } from './ui/carpool-form';
import { HowMercuryWorks } from './how-mercury-works';
import { WhyChooseMercury } from './why-choose-mercury';
import { CarpoolGrid } from './ui/carpool-grid';
import { Trip, UserDetails } from '@/types';
import { HowFaresCalculated } from './how-fares-calculated';

type Subscription = Database['public']['Tables']['subscriptions']['Row'];
type Product = Database['public']['Tables']['products']['Row'];
type Price = Database['public']['Tables']['prices']['Row'];

interface Props {
  trips: Trip[] | null | undefined;
  user: User | null | undefined;
  userDetails: UserDetails | null;
}


export default function MercuryHome({
  trips,
  user,
  userDetails,
}: Props) {


  const router = useRouter();
  return (
    <>
      <div className="flex flex-col pt-32 items-center justify-center">
        <h1 className="font-medium text-4xl text-black mb-3 animate-in fade-in slide-in-from-bottom-3 duration-1000 ease-in-out">
          Book A Ride
        </h1>

        <CarpoolCount />

        <div className="max-w-md space-y-4 px-4 sm:px-0.5 w-full animate-in fade-in slide-in-from-bottom-4 duration-1200 ease-in-out">
          <CarpoolForm user={user} />
        </div>
        {!user ?
          <>
            <HowMercuryWorks />
            <HowFaresCalculated />
            <WhyChooseMercury />
          </> : <>
            <CarpoolGrid user={user} trips={trips} />
          </>
        }
      </div>

    </>);
}




