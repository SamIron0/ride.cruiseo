'use client';
import { Grid } from '@/components/Grid';
import Navbar from '@/components/navbar/NavBar';
import { createClient } from '@/lib/supabase/server';
export default function Home() {
  return (
    <>
      <Navbar />

      <Grid></Grid>
    </>
  );
}
