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

export const getUsersTrips = async (userId: string) => {
  // Assuming `trips` is an array of user IDs
  let allTrips = null
  const { data: tripsArray, error: tripsError } = await supabase
    .from("profiles")
    .select("trips(*)")
    .eq("id", userId)

  if (tripsError) {
    console.error("Error fetching trips from profiles:", tripsError)
  } else {
    const tripIds = tripsArray[0]?.trips.map(trip => trip.id) || []

    if (tripIds.length > 0) {
      const { data: allTrips, error: allTripsError } = await supabase
        .from("trips")
        .select("*")
        .in("id", tripIds)

      if (allTripsError) {
        console.error("Error fetching all trips:", allTripsError)
      }
      return allTrips
    } else {
      console.log("No trips found for the given user.")
    }
  }
  return allTrips
}
