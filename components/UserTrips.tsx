"use client"

import { getUsersTrips } from "@/db/trips"
import { Trip } from "@/types"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/browser-client"
interface UserTripsProps {}
export const UserTrips = () => {
  const [trips, setTrips] = useState<Trip[]>([])
  const getTrips = async () => {
    try {
      const session = await supabase.auth.getSession()
      const userID = session.data.session?.user.id

      // Ensure userID is retrieved successfully
      if (!userID) throw new Error("User ID not found")

      const trips = await getUsersTrips(userID)
      setTrips(trips)
    } catch (error) {
      console.error("Error retrieving user ID:", error)
      return
    }
  }

  useEffect(() => {
    getTrips()
  }, [])

  return (
    <div className="p-4 overflow-y-auto">
      {trips.map(trip => (
        <div
          key={trip.id}
          className={`flex text-sm flex-col items-center border mb-2 p-4 rounded-lg border-input`}
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
