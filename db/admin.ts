import { createClient } from "@supabase/supabase-js"
import type { Database, Tables, TablesInsert } from "@/supabase/types"
import { v4 as uuid } from "uuid"
import { use } from "react"
import { tr } from "date-fns/locale"
// Change to control trial period length
const TRIAL_PERIOD_DAYS = 0

// Note: supabaseAdmin uses the SERVICE_ROLE_KEY which you must only use in a secure server-side context
// as it has admin privileges and overwrites RLS policies!
const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
)

export const cancelTrip = async (tripId: string, userId: string) => {
  console.log("Cancelling trip:", tripId)
  const { data: userTrips, error: cancelUserTripsError } = await supabaseAdmin
    .from("usertrips")
    .update({ id: tripId, uid: userId, status: "cancelled" })
    .eq("id", tripId)
    .select("*")

  if (cancelUserTripsError) {
    console.error("Error cancelling user trip:", cancelUserTripsError)
  }
  if (!userTrips) return
  const { error: caancelTripsError } = await supabaseAdmin
    .from("trips")
    .update({ id: userTrips[0].tripid, status: "cancelled" })
    .eq("id", userTrips[0].tripid)

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
export async function hasSessionIdBeenUsed(
  sessionId: string | null
): Promise<boolean> {
  // Query your database to see if the session ID exists
  if (sessionId === null) {
    return false
  }
  const { data, error } = await supabaseAdmin
    .from("stripe_sessions")
    .select("*")
    .eq("session_id", sessionId)

  if (error) {
    console.error("Error checking if session ID has been used:", error)
    return false
  }
  return data.length > 0
}

// Function to mark a session ID as used
async function markSessionIdAsUsed(sessionId: string): Promise<void> {
  const { error } = await supabaseAdmin
    .from("stripe_sessions")
    .insert({ id: uuid(), session_id: sessionId })

  if (error) {
    throw new Error("Error marking session ID as used")
  }
}
export const saveTrip = async (trip: Tables<"trips">, sessionId: string) => {
  await markSessionIdAsUsed(sessionId)

  let tripID: any = null
  const { data: tripVal, error: getUserTripsError } = await supabaseAdmin
    .from("trips")
    .select("*")
    .eq("id", trip.id)
    .single()

  if (tripVal) {
    //update trip if it exists
    const { data: id, error: updateTripError } = await supabaseAdmin
      .from("trips")
      .update({
        id: tripVal.id,
        riders: tripVal.riders?.concat(trip?.riders ? trip?.riders[0] : ""),
        price: tripVal?.price + trip?.price,
        route: tripVal.route?.concat(
          trip?.route ? trip?.route[0] : "",
          trip?.route ? trip?.route[1] : ""
        )
      })
      .eq("id", tripVal.id)
      .select("id")
      .single()

    if (updateTripError) {
      console.error("Error updating trip:", updateTripError)
      return null
    }

    tripID = id.id
  } else {
    const { data: idData, error: createTripError } = await supabaseAdmin
      .from("trips")
      .insert(trip)
      .select("id")
      .single()

    if (createTripError) {
      console.error("Error creating new trip:", createTripError)
      return null
    }

    tripID = idData.id
  }

  // next, create usertrips entry
  const { data: userTrip, error: createUserTripError } = await supabaseAdmin
    .from("usertrips")
    .insert({
      id: uuid(),
      uid: trip?.riders ? trip?.riders[0] : "",
      tripid: tripID,
      origin: trip?.route?.[0],
      destination: trip?.route?.[1],
      price: trip?.price,
      pickup: trip?.start,
      status: "pending"
    })

  if (createUserTripError) {
    console.error("Error creating usertrip:", createUserTripError)
    return null
  }
}

export const getAvailableTrips = async (
  uid: string,
  date: string,
  destination: string
) => {
  const { data: trips, error } = await supabaseAdmin
    .from("trips")
    .select("*")
    .in("status", ["pending", "accepted"])
    .eq("destination", destination)
  //  .eq("start->>date", date) // Extract the text value of the date field from the JSONB column
  //  .contains("riders", [])
  // .not("riders", "cs", `{${uid}}`) // Properly format the uid for the array contains check
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
