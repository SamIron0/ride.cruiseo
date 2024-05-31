"use client"

import { getUsersTrips } from "@/db/trips"
import { useContext, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/browser-client"
import { CruiseoContext } from "@/context/context"
import { Tables } from "@/supabase/types"
import { TablesInsert } from "@/supabase/types"
interface UserTripsProps {}
export const UserTrips = () => {
  const [trips, setTrips] = useState<Tables<"usertrips">[] | null>([])

  useEffect(() => {
    const storedTrip = window.localStorage.getItem("selectedTrip")

    if (storedTrip) {
      ;(async () => {
        try {
          const session = await supabase.auth.getSession()
          const userID = session.data.session?.user.id
          if (!userID) throw new Error("User ID not found")

          const response = await fetch("/api/saveTrip", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ storedTrip })
          })

          if (!response.ok) throw new Error("Failed to create trip")
        } catch (e) {
          console.error(e)
        }
      })()
    }
    getTrips()
  }, [])
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

  return (
    <div className="p-4 overflow-y-auto">
      {trips?.map(trip => (
        <div
          key={trip.id}
          className={`flex text-sm flex-col items-center border mb-2 p-4 rounded-lg border-input`}
        >
          <div className="mb-3 flex flex-row w-full justify-between">
            <span className="">{trip.pickup?.date}</span>
            <div className="flex flex-row">
              <span className="font-semibold mr-2">2 seats</span>
              <span>${trip.price}</span>
            </div>
          </div>
          <div className="flex mb-2 w-full  flex-col">
            <span className="flex flex-col text-sm mb-1  ">{trip.origin}</span>
            <span className="flex flex-col text-sm">{trip.destination}</span>
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
