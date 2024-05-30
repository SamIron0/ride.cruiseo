import { createClient } from "@supabase/supabase-js"
import type { Database, Tables, TablesInsert } from "@/supabase/types"

// Change to control trial period length
const TRIAL_PERIOD_DAYS = 0

// Note: supabaseAdmin uses the SERVICE_ROLE_KEY which you must only use in a secure server-side context
// as it has admin privileges and overwrites RLS policies!
const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
)

export const retrieveDestinations = async () => {
  const { data: destinations, error } = await supabaseAdmin
    .from("destinations")
    .select("id,name,address,photo,category")

  if (error) {
    console.error("Error retrieving destinations:", error)
    return null
  }

  return destinations
}

export const getDestinationById = async (id: string) => {
  const { data: destination, error } = await supabaseAdmin
    .from("destinations")
    .select("*")
    .eq("id", id)
    .single()

  if (error) console.error("Error retrieving destination:", error)
  return destination

  return destination
}

export const createTrip = async ({ trip }: { trip: TablesInsert<"trips"> }) => {
  return trip.id
}
