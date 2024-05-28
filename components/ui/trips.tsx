import { Trip } from "@/types"

interface TripsProps {
  trips: Trip[]
}
export const Trips = ({ trips }: TripsProps) => {
  return (
    <div>
      {trips.map(trip => (
        <div key={trip.id}>{trip.price}</div>
      ))}
    </div>
  )
}
