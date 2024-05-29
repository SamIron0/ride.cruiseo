import { supabase } from "@/lib/supabase/browser-client"
import { Destination, Trip } from "@/types"

export const deleteTrip = async (tripId: string, userId: string) => {
  // delete from trips array
  await supabase.from("trips").update({ status: "Cancelled" }).eq("id", tripId)

  /*  const user = await supabase
        .from('users')
        .select('trips')
        .eq('id', userId)
        .single();
    
      //helper to gete trip id
      async function get_id(trip: any) {
        let result = ""
        const tripData = await getTrip(trip);
        tripData ? result = tripData.id : result = "";
        return result
      }
    
      if (user.data && user.data.trips) {
        user.data.trips = user.data.trips.filter(
          async (trip) => await get_id(trip) !== tripId
        );
    
        const { data, error } = await supabase
          .from('users')
          .update({ id: userId, trips: user.data.trips })
          .eq('id', userId);
      }*/
}

export const getTrip = async (tripId: string) => {
  const { data: trip, error } = await supabase
    .from("trips")
    .select("*")
    .eq("id", tripId)
    .single()

  if (error) {
    console.error("Error fetching trip:", error)
    throw error
  }

  return trip
}

export const getUsersTrips = async (userId: string) => {
  const { data: trips, error } = await supabase
    .from("trips")
    .select("*")
    .eq("user_id", userId)

  if (error) {
    console.error("Error fetching trips:", error)
    throw error
  }

  return trips
}
