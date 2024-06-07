"use client"
import { UserTrips } from "@/components/UserTrips"
import { CruiseoContext } from "@/context/context"
import { supabase } from "@/lib/supabase/browser-client"
import { Tables, TablesInsert } from "@/supabase/types"
import { useRouter } from "next/navigation"
import React, { useContext, useEffect, useState } from "react"
import { toast } from "sonner"
import { v4 as uuid } from "uuid"
export default function Dashboard() {
  const [status, setStatus] = useState(null)
  const router = useRouter()
  const [trips, setTrips] = useState<Tables<"usertrips">[]>([])
  const [userTrip, setUserTrip] = useState<Tables<"usertrips"> | null>(null)
  const { profile } = useContext(CruiseoContext)
  const getUsersTrips = async () => {
    const session = await supabase.auth.getSession()
    const userID = session.data.session?.user?.id
    try {
      const response = await fetch("/api/getUserTrips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userID })
      })

      if (!response.ok) {
        throw new Error("Failed to fetch trips")
      }

      const data = await response.json()
      setTrips(data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleTripCancel = async (trip_id: string) => {
    const res = await fetch("/api/cancelTrip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ trip_id })
    })

    if (res.ok) {
      toast.success("Trip canceled successfully")
      getUsersTrips()
    }
  }
  useEffect(() => {
    ;(async () => {
      try {
        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString)
        const sessionId = urlParams.get("session_id")
        getUsersTrips()

        if (!sessionId) {
          return
        }

        const storedTrip = window.localStorage.getItem("selectedTrip")

        if (storedTrip) {
          //create a usertrip
          const response = await fetch("/api/saveTrip", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              trip: storedTrip,
              sessionId
            })
          })

          if (!response.ok) {
            return
          }

          toast.success(
            "Booking confirmed! We appreciate your business! If you have any questions, please contact us."
          )

          const data = await response.json()
          console.log(data)
          setStatus(data.status)
          getUsersTrips()
        }
      } catch (error) {
        console.error(error)
        toast.error("An error occurred. Please try again.")
      }
    })()
  }, [])

  useEffect(() => {
    if (status === "open") {
      router.push("/")
    }
  }, [status, router])

  return (
    <div className="w-full flex flex-col">
      <UserTrips trips={trips} onCancelTrip={trip => handleTripCancel(trip)} />
    </div>
  )
}
