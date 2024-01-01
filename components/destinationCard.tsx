import { Destination, Trip } from "@/types";
import { getTrip } from "@/utils/supabase-admin";

interface DestinationCardProps {
  destination: Destination
}
export function DestinationCard({ destination }: DestinationCardProps) {
  const times: string[] = [];
  let tripTime: any
  const arrivalTimes = () => (
    destination.trip_ids.map(async (tripId) => (
      tripTime = await getTrip(tripId),
      times.push(tripTime)
    )
    )
  )
  return (
    <>
      <div className="relative flex flex-col mt-6 text-gray-700 ">
        <div
          className="relative -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl shadow-blue-gray-500/40">
          <img
            src={destination.photo}
            alt="card-image"
            className="" />
        </div>
        <div className="pt-3">
          <h5 className="block font-sans text-md antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            {destination.name}
          </h5>

          <p className="block text-sm font-sans antialiased font-light leading-relaxed text-inherit">
            {destination.address}
          </p>
          <p className="block text-sm font-sans antialiased font-light leading-relaxed text-inherit">
            Arrives:{arrivalTimes()}
          </p>
        </div>
      </div></>
  )
}
