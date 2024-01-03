import CruiseoHome from '@/components/cruiseoHome';
import {
  getSession,
  getSubscription,
  getActiveProductsWithPrices,
  getUserDetails
} from '@/app/supabase-server';
import { Trip, UserDetails } from '@/types';
import { retrieveUsersTrips, retrieveDestinations, getTrip } from '@/utils/supabase-admin';
//import { useRouter } from 'next/navigation';

export default async function PricingPage() {
  const userDetails: UserDetails | null = await getUserDetails();
  const [session, subscription] = await Promise.all([
    getSession(),
    getSubscription()
  ]);
  let trip_ids: string[] | null | undefined
  let trips: Trip[] | null | undefined

  //const router = useRouter()
  if (!session) {
    //router.push('/signin');
  } else {
    trip_ids = await retrieveUsersTrips(session?.user?.id);
  }
  const promises = trip_ids?.map((trip) => getTrip(trip));
  // Use Promise.all to wait for all promises to resolve
  if (promises) {
    await Promise.all(promises);

  }


  const destinations = await retrieveDestinations();
  return (
    <CruiseoHome
      trips={trips}
      user={session?.user}
      userDetails={userDetails}
    />
  );
}
