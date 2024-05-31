"use client"

import ClientOnly from "@/components/ClientOnly"
import ListingClient from "./ListingClient"
import { useEffect, useState } from "react"
import Container from "@/components/Container"

interface IParams {
  destinationId?: string
}

const ListingPage = ({ params }: { params: IParams }) => {
  const [destination, setDestination] = useState(null)

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const url = "/api/getDestinationById"
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({ id: params.destinationId })
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
        <Container>
          <div
            className="
          max-w-3xl 
          mx-auto
          pt-6
        "
          >
            <div className="flex flex-col pb-12  gap-6">
              <div className="w-32 flex  px-5 py-2 text-sm text-gray-700 transition-all duration-200 border rounded-lg gap-x-2 dark:hover:bg-zinc-800 dark:bg-background dark:text-zinc-200 dark:border-input hover:scale-105 active:scale-90"></div>
              <div className=" w-32 h-[32px] rounded-lg bg-background "></div>
              <div className=" w-64 h-[32px] rounded-lg bg-background "></div>
              <div className=" w-full max-w-3xl h-[147.95px] rounded-lg bg-background "></div>
              <div className=" w-full max-w-3xl h-[130px] rounded-lg bg-background "></div>
            </div>
          </div>
        </Container>
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
