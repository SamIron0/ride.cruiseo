'use client';
import { Grid } from '@/components/Grid';
import Navbar from '@/components/navbar/NavBar';
import { createClient } from '@/lib/supabase/server';
export default async function Home() {
  return (
    <div>
      {" "}
      <Navbar />

      <Grid></Grid>
    </div>
  );
}
