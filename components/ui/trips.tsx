import { Trip } from "@/types"

interface TripsProps {
  trips: Trip[]
}
export const Trips = ({ trips }: TripsProps) => {
  return (
    <div className="p-4">
      {trips.map(trip => (
        <div>
          <div key={trip.id}>{trip.date}</div>
          <div>{trip.price}</div>
        </div>
      ))}
    </div>
  )
}
