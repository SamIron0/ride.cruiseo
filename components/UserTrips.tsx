"use client"

import { useContext, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/browser-client"
import { CruiseoContext } from "@/context/context"
import { Tables } from "@/supabase/types"
import { TablesInsert } from "@/supabase/types"
import { toast } from "sonner"
import { Button } from "./ui/button"
import Link from "next/link"

interface UserTripsProps {
  bookingConfirmation?: boolean
}

export const UserTrips = ({ bookingConfirmation }: UserTripsProps) => {
  const [trips, setTrips] = useState<Tables<"usertrips">[] | null>([])
  const { selectedTrip,setSelectedTrip } = useContext(CruiseoContext)

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
            body: JSON.stringify({ trip: storedTrip })
          })

          if (!response.ok) throw new Error("Failed to create trip")
        } catch (e) {
          console.error(e)
        }
      })()
    }
    // Call getTrips only after saveTrip completes successfully
    getTrips()
    selectedTrip && setSelectedTrip(null)
    if (bookingConfirmation) {
      toast.success(
        " Booking confirmed! We appreciate your business! If you have any questions, please contact us."
      )
    }
  }, [])

  const getTrips = async () => {
    try {
      const session = await supabase.auth.getSession()
      const userID = session.data.session?.user.id

      // Ensure userID is retrieved successfully
      if (!userID) throw new Error("User ID not found")

      const trips = await fetch("/api/getUserTrips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userID })
      })

      if (!trips.ok) throw new Error("Failed to retrieve trips")

      const data = await trips.json()
      setTrips(data)
    } catch (error) {
      console.error("Error retrieving user ID:", error)
      return
    }
  }

  return (
    <div className="p-4 w-full mb-20 mt-12 flex flex-col  max-w-3xl">
      <p className="text-2xl  mb-4">Welcome back to Cruiseo</p>
      <Link
        href="/"
        className="px-4 w-32 py-2 mb-8 flex justify-center border border-input bg-background rounded-xl"
      >
        Book Trip
      </Link>
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold mb-4">Recent Trips </h2>
        {trips?.map(trip => (
          <div
            key={trip.id}
            className={`flex text-sm flex-col items-center border mb-5 p-4 rounded-lg border-input`}
          >
            <div className="mb-5 flex flex-row w-full justify-between">
              <span className="">{trip.pickup?.date}</span>
              <div className="flex flex-row">
                <span className="font-semibold mr-2">2 seats</span>
                <span>${trip.price}</span>
              </div>
            </div>
            <div className="flex mb-2 w-full flex-col">
              <span className="flex flex-col text-sm mb-1">{trip.origin}</span>
              <span className="flex flex-col text-sm">{trip.destination}</span>
            </div>
            <div className="flex w-full -space-x-4 rtl:space-x-reverse">
              <img
                className="w-8 h-8 border-2 rounded-full border-gray-800"
                src="public/forks.jpg"
                alt=""
              />
              <img
                className="w-8 h-8 border-2 rounded-full border-gray-800"
                src="/docs/images/people/profile-picture-2.jpg"
                alt=""
              />
              <img
                className="w-8 h-8 border-2 rounded-full border-gray-800"
                src="/docs/images/people/profile-picture-3.jpg"
                alt=""
              />
              <img
                className="w-8 h-8 border-2 rounded-full border-gray-800"
                src="/docs/images/people/profile-picture-4.jpg"
                alt=""
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
