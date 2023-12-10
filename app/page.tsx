import MercuryHome from '@/components/mercuryHome';
import {
  getSession,
  getSubscription,
  getActiveProductsWithPrices,
  getUserDetails
} from '@/app/supabase-server';
import { Trip, UserDetails } from '@/types';
import { retrieveTrips } from '@/utils/supabase-admin';
//import { useRouter } from 'next/navigation';

export default async function PricingPage() {
  const userDetails: UserDetails | null = await getUserDetails();
  const [session, subscription] = await Promise.all([
    getSession(),
    getSubscription()
  ]);
  let trips: Trip[] | null | undefined

  //const router = useRouter()
  if (!session) {
    //router.push('/signin');
  } else {
    trips = await retrieveTrips(session?.user?.id);
    console.log("trips length :"+ trips?.length)
  }
  return (
    <MercuryHome
      trips={trips}
      user={session?.user}
      userDetails={userDetails}
    />
  );
}
