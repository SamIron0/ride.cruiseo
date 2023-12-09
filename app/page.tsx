import MercuryHome from '@/components/mercuryHome';
import {
  getSession,
  getSubscription,
  getActiveProductsWithPrices,
  getUserDetails
} from '@/app/supabase-server';
import { UserDetails } from '@/types';

export default async function PricingPage() {
  const userDetails: UserDetails | null =await getUserDetails();

  const [session, subscription] = await Promise.all([
    getSession(),
        getSubscription()
  ]);

  return (
    <MercuryHome
      session={session}
      user={session?.user}
      userDetails={userDetails}
    />
  );
}
