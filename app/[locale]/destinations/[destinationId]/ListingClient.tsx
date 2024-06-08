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
import { calculatePrice } from "@/utils/helpers"
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
  useEffect(() => {
    setStep(0)
    setAvailableTrips([
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
    ])
  }, [dateTime.date, origin])
  const [distance, setDistance] = useState(null)
  const onSearchClick = async () => {
    await getTrips()
    setSelectedTrip(availableTrips[0])

    const fetchPrice = async (trip: Tables<"trips">) => {
      const response = await fetch("/api/price", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          origin: origin,
          destination: trip?.destination,
          trip: trip
        })
      })
      return response.json()
    }

    const pricePromises = availableTrips.map(trip => fetchPrice(trip))
    const prices = await Promise.all(pricePromises)

    const updatedTrips = availableTrips.map((trip: Tables<"trips">, index) => {
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
      setAvailableTrips(availableTrips.concat(retrievedTrips))
    } catch {
      console.error("An error occurred while fetching trips")
    }
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
            origin={origin}
            dateTime={dateTime}
            onSetOrigin={setOrigin}
            onSetDateTime={setDateTime}
          />

          <Drawer>
            <DrawerTrigger
              disabled={origin == "" || dateTime.date == ""}
              onClick={() => onSearchClick()}
              className=" rounded-lg py-2 px-8 bg-blue-500 text-md max-w-xl"
            >
              Search
            </DrawerTrigger>
            <DrawerContent>
              {step == 0 ? (
                <div className="max-w-3xl w-full mx-auto flex flex-col">
                  <DrawerHeader>
                    <DrawerTitle>
                      <div>
                        <h1 className="text-2xl font-bold w-full">Results</h1>
                      </div>
                    </DrawerTitle>
                  </DrawerHeader>
                  <Trips
                    selectedTrip={selectedTrip}
                    onSelectTrip={(trip: Tables<"trips">) =>
                      setSelectedTrip({
                        ...trip,
                        riders: [profile?.id || ""],
                        route: [origin, destination],
                        start: dateTime
                      })
                    }
                    trips={availableTrips}
                  />
                  <DrawerFooter>
                    <Button onClick={() => setStep(2)}>Book</Button>
                    <DrawerClose>
                      <Button
                        onClick={() => setStep(0)}
                        className="w-full "
                        variant="outline"
                      >
                        Cancel
                      </Button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              ) : (
                <div className="max-w-3xl w-full mx-auto flex flex-col ">
                  <DrawerHeader>
                    <DrawerTitle>
                      <div>
                        <h1 className="text-2xl font-bold w-full">Checkout</h1>
                      </div>
                    </DrawerTitle>
                  </DrawerHeader>

                  <Checkout
                    selectedTrip={selectedTrip}
                    onBackClick={() => setStep(0)}
                  />
                </div>
              )}
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient
