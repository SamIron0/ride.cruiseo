import { supabase } from "@/lib/supabase/browser-client"
import { Destination, Trip } from "@/types";

export const retrieveDestinations = async (): Promise<Destination[] | null> => {
  try {
    const { data: destinations } = await supabase
      .from('destinations')
      .select('id,name,address,photo,category');

    if (!destinations || destinations.length === 0) {
      return null;
    }

    return destinations;
  } catch (error) {
    console.error('Error retrieving destinations:', error);
    return null;
  }
};

export const retrieveDestinations2 = async (): Promise<
  Destination[] | null
> => {
  try {
    const { data: destinations } = await supabase
      .from('destinations')
      .select('*');

    if (!destinations || destinations.length === 0) {
      return null;
    }

    const enhancedDestinations = await Promise.all(
      destinations.map(async (destination) => {
        if (destination.trip_ids && destination.trip_ids.length > 0) {
          const activeTrips = await Promise.all(
            destination.trip_ids.map(async (tripId) => {
              const { data: trip } = await supabase
                .from('trips')
                .select('*')
                .eq('id', tripId)
                .single();

              if (trip && trip.status === 'Active') {
                return {
                  id: trip.id,
                  date: trip.date,
                  status: trip.status,
                  origin: trip.origin,
                  destination_id: trip.destination_id,
                  user_ids: trip.user_ids,
                  price: trip.price
                } as Trip;
              } else {
                return null;
              }
            })
          );

          destination.activeTrips = activeTrips.filter(
            (trip) => trip !== null
          ) as Trip[];
          destination.times = destination.activeTrips.map(
            (trip) => trip?.date || ''
          );
        } else {
          destination.activeTrips = [];
          destination.times = [];
        }

        return destination;
      })
    );

    return enhancedDestinations;
  } catch (error) {
    console.error('Error retrieving destinations:', error);
    return null;
  }
};
export const getDestinationById = async (id: string) => {
  const destination = (
    await supabase.from('destinations').select('*').eq('id', id).single()
  ).data;
  if (destination) {
    try {
      destination.activeTrips = (
        await Promise.all(
          destination.trip_ids.map(
            async (tripId) =>
              (
                await supabase
                  .from('trips')
                  .select('*')
                  .eq('id', tripId)
                  .single()
              ).data
          )
        )
      ).filter((trip) => trip?.status === 'Active') as Trip[];
    } catch (error) {
      console.error('Error retrieving destination:', error);
    }
  }
  return destination;
};
//getDestinationById
export const retrieveTimes = async (destinations: Destination[]) => {
  const { data: times } = await supabase.from('destinations').select('');
  return times;
};
export const deleteTrip = async (tripId: string, userId: string) => {
  // delete from trips array
  await supabase
    .from('trips')
    .update({ status: 'Cancelled' })
    .eq('id', tripId);

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
};
export const createTrip = async ({
  trip,
  userIds
}: {
  trip: Trip;
  userIds: string[];
}) => {
  
};


export const getTrip = async (tripId: string) => {
  const { data: trip, error } = await supabase
    .from('trips')
    .select('*')
    .eq('id', tripId)
    .single();

  if (error) {
    console.error('Error fetching trip:', error);
    throw error;
  }

  return trip;
};
