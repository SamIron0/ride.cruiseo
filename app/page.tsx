import CruiseoHome from '@/components/cruiseoHome';
import {
  getSession,
  getSubscription,
  getActiveProductsWithPrices,
  getUserDetails
} from '@/app/supabase-server';
import { Trip, UserDetails } from '@/types';
import { retrieveUsersTrips,retrieveDestinations } from '@/utils/supabase-admin';
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
    trips = await retrieveUsersTrips(session?.user?.id);
  }
  const destinations= await retrieveDestinations();
  return (
    <CruiseoHome
      trips={trips}
      user={session?.user}
      userDetails={userDetails}   
    />
  );
}
