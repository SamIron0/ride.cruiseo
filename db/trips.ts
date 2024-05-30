import { supabase } from "@/lib/supabase/browser-client"
import { Destination, Trip } from "@/types"

export const deleteTrip = async (tripId: string, userId: string) => {
  // delete from trips array
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
  const { data, error } = await supabase
    .from("usertrips")
    .select("*")
    .eq("id", userId)
    .order("created_at", { ascending: false })
  return data
}
