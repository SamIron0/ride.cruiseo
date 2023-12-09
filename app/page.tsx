import MercuryHome from '@/components/mercuryHome';
import {
  getSession,
  getSubscription,
  getActiveProductsWithPrices
} from '@/app/supabase-server';

export default async function PricingPage() {
  const [session, products, subscription] = await Promise.all([
    getSession(),
    getActiveProductsWithPrices(),
    getSubscription()
  ]);

  return (
    <MercuryHome
      session={session}
      user={session?.user}
    />
  );
}
