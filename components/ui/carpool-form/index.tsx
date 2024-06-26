"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import React from "react"
import getAddressPredictions from "./getAddressPredictions"
import { toast } from "sonner"
import DateTimePicker from "../dateTimePicker/dateTimePicker"
import { Button } from "../button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "../drawer"
import { Tables } from "@/supabase/types"
import { Trips } from "../trips"
import { Checkout } from "@/components/checkout"
interface CarpoolFormProps {
  origin: string
  step: number
  selectedTrip: Tables<"trips"> | null
  destination: string

  dateTime: {
    date: string
    hour: string
    ampm: string
    minute: string
  }
  onSetOrigin: (origin: string) => void
  onSetDateTime: (dateTime: {
    date: string
    hour: string
    ampm: string
    minute: string
  }) => void
  onSearchClick: any
  setStep: (step: number) => void
  availableTrips: Tables<"trips">[]
  profile: Tables<"profiles"> | null
  setSelectedTrip: (trip: Tables<"trips">) => void
}

export const CarpoolForm = ({
  step,
  destination,
  selectedTrip,
  origin,
  dateTime,
  onSetOrigin,
  setSelectedTrip,
  availableTrips,
  profile,
  setStep,
  onSetDateTime,
  onSearchClick
}: CarpoolFormProps) => {
  const [originSuggestionIsOpen, setOriginSuggestionIsOpen] = useState(true)
  const [originIsOpen, setOriginIsOpen] = useState(true)
  const [destinationIsOpen, setDestinationIsOpen] = useState(true)
  const [dateIsOpen, setDateIsOpen] = useState(false)
  //const [prediction, setPredictions] = useState<any>();
  const originPredictions = getAddressPredictions(origin)
  //const destinationPredictions = getAddressPredictions(destination);

  const formatOptions = (
    predictions: string[]
  ): { label: string; value: string }[] => {
    return predictions.map(prediction => ({
      label: prediction,
      value: prediction // You can customize how the 'value' is generated
    }))
  }

  const handleTripDetailsSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault()
  }

  let formattedOriginOptions = formatOptions(originPredictions)
  function setOriginAndSuggestions(value: string) {
    onSetOrigin(value)
    if (value.length > 0) {
      setOriginSuggestionIsOpen(true)
    } else setOriginSuggestionIsOpen(false)
  }

  function onOriginSuggestionClick(value: any) {
    onSetOrigin(value)
    setOriginSuggestionIsOpen(false)
  }

  const destinationRef = useRef<any>()
  const originRef = useRef<any>()

  useEffect(() => {
    const handleOutsideOriginClick = (event: any) => {
      if (
        originRef.current &&
        !(originRef.current as HTMLElement).contains(event.target)
      ) {
        // Clicked outside the destination suggestion, close it
        setOriginSuggestionIsOpen(false)
      }
    }
    // Add event listener when the component mounts
    document.addEventListener("click", handleOutsideOriginClick)

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleOutsideOriginClick)
    }
  }, [])

  return (
    <form
      onSubmit={handleTripDetailsSubmit}
      className="flex flex-col text-white items-center max-w-xl justify-center w-full"
    >
      {originIsOpen ? (
        <div className="flex flex-col mb-4 border-input  border w-full p-6 lg:p-12 h-lg shadow-lg rounded-xl bg-background">
          <h1 className=" font-medium   text-lg">Pickup from</h1>
          <div className="mt-5   border border-input rounded-xl relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              value={origin}
              onChange={e => setOriginAndSuggestions(e.target.value)}
              placeholder={"Search"}
              className="bg-transparent px-4 py-2 placeholder:text-gray-400 text-gray-400 ring-0  rounded-xl ps-10 border  bg-gray-100 border-input outline-none w-full "
            ></input>
          </div>

          {originSuggestionIsOpen && (
            <div
              ref={originRef}
              className={
                formattedOriginOptions.length > 0
                  ? "w-full mt-2 divide-y border border-input  rounded-xl shadow bg-background divide-input "
                  : ""
              }
            >
              {formattedOriginOptions?.map((formatOption, index) => (
                <button
                  onClick={() => onOriginSuggestionClick(formatOption.value)}
                  className="text-md hover:bg-zinc-900 flex items-center text-left w-full p-2   "
                  key={index}
                >
                  <div className="bg-gray-100 flex rounded-xl justify-center items-center p-1 mr-3">
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="26"
                      viewBox="0 -960 960 960"
                      width="26"
                    >
                      <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
                    </svg>
                  </div>
                  {formatOption.value}
                </button>
              ))}
            </div>
          )}
          <div className="w-full justify-end">
            <Button
              onClick={() => {
                setDateIsOpen(true)
                setOriginIsOpen(false)
              }}
              className="bg-white hover:bg-zinc-300 mt-3 text-sm text-black font-semibold py-3 px-5 rounded-lg"
              disabled={origin === ""}
            >
              Proceed
            </Button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => {
            setDateIsOpen(false)
            setOriginIsOpen(true)
          }}
          className="flex mb-4 flex-col items-center border-input border w-full p-6 lg:p-12 h-lg shadow-lg rounded-xl bg-background"
        >
          <div className="flex flex-row w-full items-center justify-between">
            {" "}
            <h1 className="font-medium text-lg ">Pickup from </h1>{" "}
            <p className="text-sm font-light text-neutral-500">{origin}</p>
          </div>
        </div>
      )}
      {dateIsOpen ? (
        <div className="flex flex-col mb-4 border-input  border w-full p-6 lg:p-12 h-lg shadow-lg rounded-xl bg-background">
          <div className="w-full flex flex-col justify-center">
            <h1 className=" font-medium   text-lg ">When?</h1>
          </div>
          <DateTimePicker setDateTime={onSetDateTime} dateTime={dateTime} />
          <div className="w-full justify-end">
            <Drawer>
              <DrawerTrigger
                disabled={origin == "" || dateTime.date == ""}
                onClick={() => onSearchClick()}
                className="bg-white hover:bg-zinc-300 mt-3 text-sm text-black font-semibold py-3 px-5 rounded-lg"
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
                          <h1 className="text-2xl font-bold w-full">
                            Checkout
                          </h1>
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
          </div>{" "}
        </div>
      ) : (
        <div
          onClick={() => {
            setDateIsOpen(true)
            setOriginIsOpen(false)
          }}
          className="flex mb-4 flex-col items-center border-input border w-full p-6 lg:p-12 h-lg shadow-lg rounded-xl bg-background"
        >
          <div className="flex flex-row w-full items-center justify-between">
            <h1 className=" font-medium   text-lg ">When?</h1>
            <span className="text-sm font-light text-neutral-500 ">
              {" "}
              {dateTime.date} {dateTime.hour}:{dateTime.minute} {dateTime.ampm}
            </span>
          </div>
        </div>
      )}
    </form>
  )
}
