import CruiseoHome from '@/components/cruiseoHome';
import {
  getSession,
  getSubscription,
  getActiveProductsWithPrices,
  getUserDetails
} from '@/app/supabase-server';
import { Trip, UserDetails } from '@/types';
import { retrieveUsersTrips, retrieveDestinations, getTrip } from '@/utils/supabase-admin';

export default async function PricingPage() {
  const userDetails: UserDetails | null = await getUserDetails();
  const [session, subscription] = await Promise.all([
    getSession(),
    getSubscription()
  ]);

  let trip_ids: string[] | null | undefined;
  let trips: any = [];

  if (!session) {
    // Handle the case when there is no session, e.g., redirect to sign-in page
    // router.push('/signin');
  } else {
    trip_ids = await retrieveUsersTrips(session?.user?.id);

    if (trip_ids) {
      const promises = trip_ids.map(async (trip) => await getTrip(trip));
      // Use Promise.all to wait for all promises to resolve
      if (promises) {
        trips = await Promise.all(promises);
      }
    }
  }

  const destinations = await retrieveDestinations();
  console.log("trips: " + trips)
  return (
    <CruiseoHome
      trips={trips[0]}
      user={session?.user}
      userDetails={userDetails}
    />
  );
}
