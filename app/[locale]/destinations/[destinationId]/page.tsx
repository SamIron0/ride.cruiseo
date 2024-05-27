"use client"

import ClientOnly from "@/components/ClientOnly"
import { useRouter } from 'next/router';
import ListingClient from "./ListingClient"
import { useEffect, useState } from "react"

interface IParams {
  listingId?: string
}

const ListingPage = ({ params }: { params: IParams }) => {
  const [destination, setDestination] = useState(null)
  const router = useRouter();
  const { destinationId } = router.query;
  console.log('id', destinationId)

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const url = "/api/getDestinationById"
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({ id: params.listingId })
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
        <div role="status" className="max-w-3xl animate-pulse">
          <div className="h-5 rounded-full bg-gray-700 w-4 mb-6"></div>
          <div className="h-2.5 rounded-full bg-gray-700 w-8 mb-4"></div>
          <div className="h-12 rounded-full bg-gray-700 w-48 mb-8"></div>
        </div>
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
