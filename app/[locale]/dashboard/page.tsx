"use client"
import { UserTrips } from "@/components/UserTrips"
import { CruiseoContext } from "@/context/context"
import { createTrip } from "@/db/admin"
import { getUsersTrips } from "@/db/trips"
import { supabase } from "@/lib/supabase/browser-client"
import { useRouter } from "next/navigation"
import React, { useContext, useEffect, useState } from "react"

export default function Dashboard() {
  const [status, setStatus] = useState(null)
  const [customerEmail, setCustomerEmail] = useState("")
  const router = useRouter()
  const { selectedTrip, setSelectedTrip } = useContext(CruiseoContext)

  useEffect(() => {
    const storedTrip = localStorage.getItem("selectedTrip")
    if (!selectedTrip && storedTrip) {
      setSelectedTrip(JSON.parse(storedTrip))
    }

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

  useEffect(() => {
    if (status === "complete" && selectedTrip) {
      ;(async () => {
        try {
          const session = await supabase.auth.getSession()
          const userID = session.data.session?.user.id
          if (!userID) throw new Error("User ID not found")

          const response = await fetch("/api/createTrip", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ selectedTrip })
          })

          if (!response.ok) throw new Error("Failed to create trip")
        } catch (e) {
          console.error(e)
        }
      })()
    }
  }, [])

  if (status === "open") {
    return router.push("/")
  }

  if (status === "complete") {
    return (
      <div className="w-full flex flex-col">
        <section id="success">
          <p>
            We appreciate your business! A confirmation email will be sent to{" "}
            {customerEmail}. If you have any questions, please email{" "}
            <a href="mailto:orders@example.com">orders@example.com</a>.
          </p>
        </section>
        <UserTrips />
      </div>
    )
  }

  return null
}
