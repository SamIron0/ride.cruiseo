"use client"

import ClientOnly from "@/components/ClientOnly"
import EmptyState from "@/components/EmptyState"
import ListingClient from "./ListingClient"
import { getDestinationById } from "@/db/admin"
import { useEffect, useState } from "react"

interface IParams {
  listingId?: string
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const [destination, setDestination] = useState(null)
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const url = "/api/getDestinationById"
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }

        const response = await fetch(url, options)
        setDestination(await response.json())
      } catch (err) {
        console.error(err)
      }
    }

    fetchDestinations()
  }, [])
  if (!destination) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ListingClient listing={destination} />
    </ClientOnly>
  )
}

export default ListingPage
