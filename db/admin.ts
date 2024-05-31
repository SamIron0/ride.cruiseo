import { createClient } from "@supabase/supabase-js"
import type { Database, Tables, TablesInsert } from "@/supabase/types"
import { v4 as uuid } from "uuid"
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

export const saveTrip = async ({
  trip
}: {
  trip: TablesInsert<"usertrips">
}) => {
  const { data: tripVal, error } = await supabaseAdmin
    .from("trips")
    .select("*")
    .eq("id", trip?.tripid)
    .single()

  if (error) {
    console.error("Error creating trip:", error)
    return null
  }
  // If trip already exists
  if (tripVal) {
    //update trip if it exists
    const { data: y, error } = await supabaseAdmin
      .from("trips")
      .update({
        ...tripVal,
        riders: tripVal?.riders?.concat(trip?.uid),
        price: tripVal?.price + trip?.price,
        route: tripVal?.route?.concat(trip.origin)
      })
      .eq("id", trip.tripid)

    if (error) {
      console.error("Error updating trip:", error)
      return null
    }
  } else {
    const { data, error } = await supabaseAdmin.from("trips").insert({
      id: uuid(),
      riders: [trip?.uid],
      price: trip?.price,
      route: [trip?.origin, trip?.destination],
      status: "available",
      destination: trip?.tripid,
      start: trip?.pickup
    })
    if (error) {
      console.error("Error creating trip:", error)
      return null
    }
  }
  // next, create usertrips entry
  const { data: userTrip } = await supabaseAdmin.from("usertrips").insert({
    id: uuid(),
    uid: trip?.uid,
    tripid: trip?.tripid,
    origin: trip?.origin,
    destination: trip?.destination,
    price: trip?.price,
    pickup: trip?.pickup
  })

  if (error) {
    console.error("Error creating usertrip:", error)
    return null
  }
  return userTrip
}

export const getAvailableTrips = async (
  date: string,
  destinationId: string
) => {
  const { data: trips, error } = await supabaseAdmin
    .from("trips")
    .select("*")
    .eq("destination", destinationId)
    .eq("status", "available")
    .eq("start->>date", date) // Extract the text value of the date field from the JSONB column

  if (error) {
    console.error("Error retrieving trips:", error)
    return null
  }

  return trips
}
