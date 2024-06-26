"use client"

import { useEffect, useMemo, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { Destination, Trip } from "@/types"
import Container from "@/components/Container"
import ListingHead from "@/components/listings/ListingHead"
import { useContext } from "react"
import { toast } from "sonner"
import { CruiseoContext } from "@/context/context"
import { CarpoolForm } from "@/components/ui/carpool-form"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Trips } from "@/components/ui/trips"
import { Checkout } from "@/components/checkout"
import { Tables, TablesInsert } from "@/supabase/types"
import axios from "axios"
import { calculatePrice, getLatLong } from "@/utils/helpers"
interface ListingClientProps {
  listing: Destination
}

const ListingClient: React.FC<ListingClientProps> = ({ listing }) => {
  const [origin, setOrigin] = useState<string>("")
  const [destination, setDestination] = useState<string>(listing?.address)
  const { profile, selectedTrip, setSelectedTrip } = useContext(CruiseoContext)
  const [isLoading, setIsLoading] = useState(false)
  const [priceIsLoading, setPriceIsLoading] = useState(false)
  const [loadedPrices, setLoadedPrices] = useState(new Map<string, number>())
  const [availableTrips, setAvailableTrips] = useState<Tables<"trips">[]>([])
  const now = new Date()

  const date = now.toISOString().split("T")[0] // YYYY-MM-DD format
  const hours = now.getHours()
  const hour = hours % 12 || 12 // Convert to 12-hour format
  const minute = now.getMinutes().toString().padStart(2, "0") // Add leading zero if needed
  const ampm = hours >= 12 ? "PM" : "AM"

  const [dateTime, setDateTime] = useState({
    date: date,
    hour: hour.toString(),
    ampm: ampm,
    minute: minute
  })
  useEffect(() => {}, [dateTime.date, origin])
  const [distance, setDistance] = useState(null)
  const onSearchClick = async () => {
    setStep(0)

    let latLong = await getLatLong(origin)
    const res = await getTrips()
    if (res === null || res === undefined) return
    let trips: Tables<"trips">[] = [
      {
        id: uuidv4(),
        start: {
          date: dateTime.date,
          hour: dateTime.hour,
          ampm: dateTime.ampm,
          minute: dateTime.minute
        },
        price: 0,
        route: [origin, listing?.address],
        status: "pending",
        destination: destination,
        riders: [profile?.id || ""]
      }
    ]

    trips = trips.concat(res)
    setAvailableTrips(trips.concat(res))
    setSelectedTrip(trips[0])

    const fetchPrice = async (trip: Tables<"trips">) => {
      const response = await fetch("/api/price", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          origin: ` ${latLong?.[0]}, ${latLong?.[1]}`,
          destination: ` ${listing?.coordinates?.lat}, ${listing?.coordinates?.lon}`,
          trip: trip
        })
      })
      return response.json()
    }

    const pricePromises = trips?.map(trip => fetchPrice(trip))
    const prices = await Promise.all(pricePromises)

    const updatedTrips = trips.map((trip: Tables<"trips">, index) => {
      const price = prices[index]
      return { ...trip, price }
    })
    setAvailableTrips(updatedTrips)
    setSelectedTrip(updatedTrips[0])

    return
  }

  const getTrips = async () => {
    try {
      const trips: Tables<"trips">[] = await fetch("/api/getAvailableTrips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          destination: listing?.address,
          dateTime: dateTime
        })
      }).then(res => res.json())

      if (!trips) return
      let retrievedTrips: Tables<"trips">[] = []
      for (let trip of trips) {
        retrievedTrips.push({
          ...trip,
          start: dateTime,
          route: [origin, destination],
          destination: destination,
          riders: [profile?.id || ""]
        })
      }
      // setAvailableTrips(availableTrips.concat(retrievedTrips))
      // setSelectedTrip(availableTrips[0])
      return retrievedTrips
    } catch {
      console.error("An error occurred while fetching trips")
    }
    return null
  }
  const [step, setStep] = useState(0)
  return (
    <Container>
      <div
        className="
          max-w-3xl 
          mx-auto
          pt-6
        "
      >
        <div className="flex flex-col pb-12  gap-6">
          <button
            onClick={() => window.history.back()}
            type="button"
            className="w-32 flex items-center justify-center px-5 py-2 text-sm text-gray-700 transition-all duration-200 bg-white border rounded-lg gap-x-2 dark:hover:bg-zinc-800 dark:bg-background dark:text-zinc-200 dark:border-input hover:scale-105 active:scale-90"
          >
            <svg
              className="w-5 h-5 rtl:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
            <span>Go back</span>
          </button>

          <ListingHead
            title={listing?.name}
            imageSrc={listing?.photo}
            locationValue={listing?.address}
            id={listing?.id}
          />
          <CarpoolForm
            availableTrips={availableTrips}
            step={step}
            selectedTrip={selectedTrip}
            profile={profile}
            destination={destination}
            setSelectedTrip={setSelectedTrip}
            setStep={setStep}
            origin={origin}
            dateTime={dateTime}
            onSetOrigin={setOrigin}
            onSetDateTime={setDateTime}
            onSearchClick={onSearchClick}
          />
        </div>
      </div>
    </Container>
  )
}

export default ListingClient
