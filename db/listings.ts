import { supabase } from "@/lib/supabase/browser-client"
import { Destination, Trip } from "@/types"

export const retrieveDestinations = async (): Promise<Destination[] | null> => {
  try {
    const { data: destinations } = await supabase
      .from("destinations")
      .select("*")

    if (!destinations) {
      return null
    }

    return destinations
  } catch (error) {
    console.error("Error retrieving destinations:", error)
    return null
  }
}

export const getDestinationById = async (id: string) => {
  const destination = (
    await supabase.from("destinations").select("*").eq("id", id).single()
  ).data
  if (destination) {
    try {
      destination.activeTrips = (
        await Promise.all(
          destination.trip_ids.map(
            async (tripId: any) =>
              (
                await supabase
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
//getDestinationById
export const retrieveTimes = async (destinations: Destination[]) => {
  const { data: times } = await supabase.from("destinations").select("")
  return times
}
