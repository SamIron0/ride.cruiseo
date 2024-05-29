"use client"
import { UserTrips } from "@/components/UserTrips"
import { CruiseoContext } from "@/context/context"
import { createTrip } from "@/db/admin"
import { getUsersTrips } from "@/db/trips"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/browser-client"
import React, { useContext, useEffect, useState } from "react"
import { ascetic } from "react-syntax-highlighter/dist/esm/styles/hljs"

export default function Dashboard() {
  const [status, setStatus] = useState(null)
  const [customerEmail, setCustomerEmail] = useState("")
  const router = useRouter()
  const { selectedTrip, setSelectedTrip } = useContext(CruiseoContext)
  const [trips, setTrips] = useState([])
  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const sessionId = urlParams.get("session_id")

    fetch(`/api/checkout_sessions?session_id=${sessionId}`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(data => {
        setStatus(data.status)
        setCustomerEmail(data.customer_email)
      })
  }, [])

  if (status === "open") {
    return router.push("/")
  }
  if (status === "complete") {
    // Define an async function to save the trip to the database
    const saveTrip = async () => {
      try {
        const session = await supabase.auth.getSession()
        const userID = session.data.session?.user.id

        // Ensure userID is retrieved successfully
        if (!userID) throw new Error("User ID not found")

        const response = await fetch("/api/createTrip", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ selectedTrip })
        })

        if (!response.ok) throw new Error("Failed to create trip")

        const userTrips = await getUsersTrips(userID)
        return userTrips
      } catch (e) {
        console.error(e)
        return null
      }
    }

    const userTrips = saveTrip()

    return (
      <div className="w-full flex flex-col">
        <section id="success">
          <p>
            We appreciate your business! A confirmation email will be sent to{" "}
            {customerEmail}. If you have any questions, please email{" "}
            <a href="mailto:orders@example.com">orders@example.com</a>.
          </p>
        </section>
        <UserTrips trips={trips} />
      </div>
    )
  }

  return null
}
