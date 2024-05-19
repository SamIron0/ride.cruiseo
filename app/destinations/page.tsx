import { getSession, getUserDetails } from '../supabase-server';
import { Grid } from '@/components/Grid';
import { HowCruiseoWorks } from '@/components/how-cruiseo-works';
import { HowFaresCalculated } from '@/components/how-fares-calculated';
import Link from 'next/link';

export default async function Home() {
  const session = await getSession();

  return (
    <Grid user={session?.user} userDetails={getUserDetails()}></Grid>
    
  );
}