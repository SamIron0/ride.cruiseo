import { createClient } from "@supabase/supabase-js"
import type { Database, Tables, TablesInsert } from "@/supabase/types"
import { Trip } from "@/types"

type Product = Tables<"products">
type Price = Tables<"prices">

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
  const destination = (
    await supabaseAdmin.from("destinations").select("*").eq("id", id).single()
  ).data
  if (destination) {
    try {
      destination.activeTrips = (
        await Promise.all(
          destination.trip_ids.map(
            async (tripId: any) =>
              (
                await supabaseAdmin
                  .from("trips")
                  .select("*")
                  .eq("id", tripId)
                  .single()
              ).data
          )
        )
      ).filter(trip => trip?.status === "Active") as Trip[]
    } catch (error) {
      console.error("Error retrieving destination:", error)
    }
  }
  return destination
}

export const createTrip = async ({
  trip
}: {
  trip: Trip
}) => {
  return trip.id
}
