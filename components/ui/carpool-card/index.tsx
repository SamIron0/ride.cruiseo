import { Trip } from "@/types";

interface CarpoolCardProps {
  trip: Trip
}

export function CarpoolCard({ trip }: CarpoolCardProps) {

  return (
    <div className="bg-gray-200 p-2 border border-1 rounded-md ">
      <div className="flex items-center space-x-3 rtl:space-x-reverse">
        <div className="flex-shrink-0">
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm flex  font-semibold text-gray-900 truncate dark:text-white">
            Origin: <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              {trip.origin}</p>
          </p>
          <p className="text-sm font-semibold text-gray-900 truncate dark:text-white">
            Destination: <p className="text-sm flex text-gray-500 truncate dark:text-gray-400">
              {trip.destination}</p>
          </p>
          <p className="text-sm font-semibold fle text-gray-900 truncate dark:text-white">
            Price: <p className="text-sm flex  text-gray-500 truncate dark:text-gray-400">
              {trip.price}</p>
          </p>
          <p className="text-sm  flex font-semibold text-gray-900 truncate dark:text-white">
            Est. dropoff: <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              {trip.date}</p>
          </p>
        </div>
        <span className="inline-flex self-end items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
          <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
          Pending
        </span>
      </div>

    </div>
  )
}
