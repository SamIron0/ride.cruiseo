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

export const cancelTrip = async (tripId: string, userId: string) => {
  const { error: cancelUserTripsError } = await supabaseAdmin
    .from("usertrips")
    .update({ uid: userId, tripid: tripId, status: "cancelled" })
    .eq("tripid", tripId)
    .eq("uid", userId)

  if (cancelUserTripsError) {
    console.error("Error cancelling trip:", cancelUserTripsError)
  }

  const { error: caancelTripsError } = await supabaseAdmin
    .from("trips")
    .update({ status: "cancelled" })
    .eq("id", tripId)

  if (caancelTripsError) {
    console.error("Error cancelling trip:", caancelTripsError)
  }
}
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

export const saveTrip = async (trip: any) => {
  console.log("Saving trip:", trip)
  let tripID: any = null
  if (trip?.tripid) {
    const { data: tripVal, error: findTripError } = await supabaseAdmin
      .from("trips")
      .select("*")
      .eq("id", trip?.tripid)
      .single()

    if (findTripError) {
      console.error("Error finding trip:", findTripError)
      return null
    }
    //update trip if it exists
    const { data: id, error: updateTripError } = await supabaseAdmin
      .from("trips")
      .update({
        ...tripVal,
        riders: tripVal?.riders?.concat(trip?.uid),
        price: tripVal?.price + trip?.price,
        route: tripVal?.route?.concat(trip.origin)
      })
      .eq("id", trip.tripid)
      .select("id")

    if (updateTripError) {
      console.error("Error updating trip:", updateTripError)
      return null
    }

    tripID = id
  } else {
    const { data: id, error: createTripError } = await supabaseAdmin
      .from("trips")
      .insert({
        id: uuid(),
        riders: [trip?.uid],
        price: trip?.price,
        route: [trip?.origin, trip?.destination],
        status: "pending",
        destination: trip?.destination,
        start: trip?.pickup
      })
      .select("id")
      .single()

    if (createTripError) {
      console.error("Error creating new trip:", createTripError)
      return null
    }

    tripID = id
  }

  // next, create usertrips entry
  const { data: userTrip, error: createUserTripError } = await supabaseAdmin
    .from("usertrips")
    .insert({
      id: uuid(),
      uid: trip?.uid,
      tripid: tripID?.id,
      origin: trip?.origin,
      destination: trip?.destination,
      price: trip?.price,
      pickup: trip?.pickup
    })

  if (createUserTripError) {
    console.error("Error creating usertrip:", createUserTripError)
    return null
  }
}

export const getAvailableTrips = async (date: string, destination: string) => {
  const { data: trips, error } = await supabaseAdmin
    .from("trips")
    .select("*")
    .eq("status", "pending")
    .eq("destination", destination)
    .eq("start->>date", date) // Extract the text value of the date field from the JSONB column

  if (error) {
    console.error("Error retrieving trips:", error)
    return null
  }

  return trips
}

export const getUsersTrips = async (userId: string) => {
  const { data, error } = await supabaseAdmin
    .from("usertrips")
    .select("*")
    .eq("uid", userId)
    .order("created_at", { ascending: false })
  return data
}
