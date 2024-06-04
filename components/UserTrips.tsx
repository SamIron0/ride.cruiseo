"use client"

import { useContext, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/browser-client"
import { CruiseoContext } from "@/context/context"
import { Tables } from "@/supabase/types"
import { TablesInsert } from "@/supabase/types"
import { toast } from "sonner"
import { Button } from "./ui/button"
import Link from "next/link"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "./ui/drawer"

interface UserTripsProps {
  trips?: Tables<"usertrips">[]
  onCancelTrip: (tripID: string) => void
}

export const UserTrips = ({ trips, onCancelTrip }: UserTripsProps) => {
  const [tripArray, setTripArray] = useState<Tables<"usertrips">[]>()
  return (
    <div className="p-4 w-full mb-20 mt-12 flex flex-col  max-w-3xl">
      <p className="text-2xl  mb-4">Welcome back to Cruiseo</p>
      <Link
        href="/"
        className="px-4 w-32 py-2 mb-8 flex justify-center border border-input bg-background rounded-xl"
      >
        New Trip
      </Link>
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold mb-4">Recent Trips </h2>
        {trips?.map(trip => (
          <Drawer>
            <DrawerTrigger>
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
                  <span className="flex flex-col text-sm mb-1">
                    {trip.origin}
                  </span>
                  <span className="flex flex-col text-sm">
                    {trip.destination}
                  </span>
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
            </DrawerTrigger>
            <DrawerContent>
              <div className="max-w-3xl mx-auto w-full flex items-center flex-col ">
                <DrawerHeader>
                  <DrawerTitle>
                    <div>
                      <h1 className="text-2xl font-bold w-full">Edit Trip</h1>
                    </div>
                  </DrawerTitle>
                </DrawerHeader>
                <DrawerFooter className="w-full max-w-lg">
                  <DrawerClose>
                    {trip.status === "pending" ? (
                      <Button
                        variant={"destructive"}
                        onClick={() => {
                          onCancelTrip(trip.id)
                        }}
                      >
                        Cancel Trip
                      </Button>
                    ) : (
                      <Button variant={"outline"} onClick={() => {}}>
                        Rebook{" "}
                      </Button>
                    )}
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        ))}
      </div>
    </div>
  )
}
