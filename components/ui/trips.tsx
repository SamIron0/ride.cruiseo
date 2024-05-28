import { Trip } from "@/types"
import { useState } from "react"

interface TripsProps {
  trips: Trip[]
}
export const Trips = ({ trips }: TripsProps) => {
  const [selectedTrip, setSelectedTrip] = useState(trips[0])
  return (
    <div className="p-4">
      {trips.map(trip => (
        <div
          key={trip.id}
          onClick={() => setSelectedTrip(trip)}
          className={`flex text-sm flex-col items-center border mb-2 p-4 rounded-lg ${
            selectedTrip.id === trip.id ? "border-input" : "border-zinc-500"
          }`}
        >
          <div className="mb-3 flex flex-row w-full justify-between">
            <span className="">{trip.date?.date}</span>
            <div className="flex flex-row">
              <span className="font-semibold mr-2">2 seats</span>
              <span>${trip.price}</span>
            </div>
          </div>
          <div className="flex mb-2 w-full  flex-col">
            <span className="flex flex-col text-sm mb-1  ">{trip.origin}</span>
            <span className="flex flex-col text-sm">
              {trip.destination?.address}
            </span>
          </div>{" "}
          <div className="flex w-full  -space-x-4 rtl:space-x-reverse">
            <img
              className="w-8 h-8 border-2  rounded-full border-gray-800"
              src="public/forks.jpg"
              alt=""
            />
            <img
              className="w-8 h-8 border-2  rounded-full border-gray-800"
              src="/docs/images/people/profile-picture-2.jpg"
              alt=""
            />
            <img
              className="w-8 h-8 border-2  rounded-full border-gray-800"
              src="/docs/images/people/profile-picture-3.jpg"
              alt=""
            />
            <img
              className="w-8 h-8 border-2  rounded-full border-gray-800"
              src="/docs/images/people/profile-picture-4.jpg"
              alt=""
            />
          </div>{" "}
        </div>
      ))}
    </div>
  )
}
