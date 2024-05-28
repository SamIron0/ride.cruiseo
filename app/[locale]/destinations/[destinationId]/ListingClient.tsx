"use client"

import { useEffect, useMemo, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { Date, Destination, Trip } from "@/types"
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
interface ListingClientProps {
  listing: Destination
}

const ListingClient: React.FC<ListingClientProps> = ({ listing }) => {
  const [origin, setOrigin] = useState<string>("")
  const [dateTime, setDateTime] = useState({
    date: "",
    hour: "",
    ampm: "",
    minute: ""
  })
  const { profile } = useContext(CruiseoContext)
  const [isLoading, setIsLoading] = useState(false)
  const [priceIsLoading, setPriceIsLoading] = useState(false)
  const [loadedPrices, setLoadedPrices] = useState(new Map<string, number>())
  const [availableTrips, setAvailableTrips] = useState<Trip[]>([
    {
      id: uuidv4(),
      price: 25,
      date: {
        date: dateTime.date,
        hour: dateTime.hour,
        ampm: dateTime.ampm,
        minute: dateTime.minute
      },
      origin: origin
    }
  ])
  useEffect(() => {
    setAvailableTrips([
      {
        id: uuidv4(),
        price: 25,
        date: {
          date: dateTime.date,
          hour: dateTime.hour,
          ampm: dateTime.ampm,
          minute: dateTime.minute
        },
        origin: origin,
        destination: listing
      }
    ])
  }, [dateTime.date, origin])
  const getPrice = async (trip: Trip) => {
    setIsLoading(true)
    setPriceIsLoading(true)
    const toastId = toast.loading("Calculating price...")

    const workerID = 1
    const destinationraw = {
      address: listing.address,
      latitude: listing?.coordinates?.lat,
      longitude: listing?.coordinates?.lon
    }

    try {
      const response = await fetch(
        "https://1ni3q9uo0h.execute-api.us-east-1.amazonaws.com/final",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            originraw: profile?.geolocation,
            destinationraw: destinationraw,
            worker: workerID,
            userID: profile?.id
          })
        }
      )
      const result = await response.json()

      if (response.ok) {
        const responseBody = JSON.parse(result.body)
        if (responseBody.result && responseBody.result.startsWith("C")) {
          const discount = 0.1
          const fullPrice = parseFloat(
            responseBody.result.replace(/[^0-9.]/g, "")
          )
          const discountedPrice = parseFloat(
            (fullPrice * (1 - discount)).toFixed(2)
          )
          const updatedPrices = new Map(loadedPrices)
          updatedPrices.set(trip.id, discountedPrice)
          setLoadedPrices(updatedPrices)
          setIsLoading(false)
          setPriceIsLoading(false)
          toast.dismiss(toastId)
          toast.success("Done")
        } else {
          console.error("Error invoking Lambda function")
        }
      }
    } catch (error) {
      toast.dismiss(toastId)
      setIsLoading(false)
      toast.error("An error occurred while calculating price")
    }
  }
  const [selectedTrip, setSelectedTrip] = useState<Trip>({
    id: "",
    origin: "",
    destination_id: "",
    user_ids: [],
    date: {} as Date,
    price: 0,
    status: ""
  })
  const onCreateReservation = async () => {
    setIsLoading(true)
    if (!selectedTrip.id) {
      toast.error("Please select a trip")
      return
    }
    // if (!profile) {
    // router.push('/login');
    //}
    if (!loadedPrices.get(selectedTrip.id)) {
      await getPrice(selectedTrip)
    }
    if (!loadedPrices.get(selectedTrip.id)) {
      return
    }
    const newTrip: Trip = {
      id: uuidv4(),
      origin: profile?.address || "",
      destination_id: listing?.id || "",
      user_ids: [profile?.id || ""],
      date: selectedTrip.date,
      price: loadedPrices.get(selectedTrip.id) || 0,
      status: "Active"
    }
    try {
      const url = "/api/createTrip"
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newTrip)
      }
      const response = await fetch(url, options)
      const data = await response.json()
      console.log("data", data)
      if (data.error) {
        toast.error("An error occurred while creating the trip")
      } else {
        toast.success("Trip created successfully")
      }
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }
  const getTrips = async () => {
    try {
      const trips: Trip[] = await fetch("/api/getTrips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          listingID: listing?.id,
          dateTime: dateTime,
          origin: origin
        })
      }).then(res => res.json())
      setAvailableTrips(availableTrips.concat(trips))
    } catch {
      console.error("An error occurred while fetching trips")
    }
  }
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
            disabled={origin =="" || dateTime.date==""}
              onClick={() => getTrips()}
              className=" rounded-lg py-2 px-8 bg-blue-500 text-md max-w-xl"
            >
              Search
            </DrawerTrigger>
            <DrawerContent>
              <div className="max-w-3xl w-full mx-auto flex flex-col">
                <DrawerHeader>
                  <DrawerTitle>
                    <div>
                      <h1 className="text-2xl font-bold w-full">Results</h1>
                    </div>
                  </DrawerTitle>
                </DrawerHeader>
                <Trips trips={availableTrips} />
                <DrawerFooter>
                  <Button>Book</Button>
                  <DrawerClose>
                    <Button className="w-full" variant="outline">
                      Cancel
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient
