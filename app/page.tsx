import { Grid } from "@/components/Grid";
import { getSession, getUserDetails } from "./supabase-server";

interface HomeProps {
}

export default async function Home() {
    const session = await getSession();

  return <Grid user={session?.user} userDetails={getUserDetails()}></Grid>;
};

