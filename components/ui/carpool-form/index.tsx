"use client"

import { Suspense, useEffect, useCallback, useRef, useState } from "react"
import { Destination, Trip } from "@/types"
import { User } from "@supabase/supabase-js"
import Link from "next/link"
import { v4 as uuidv4 } from "uuid"
import { useRouter } from "next/navigation"
import React from "react"
import getAddressPredictions from "./getAddressPredictions"
import { toast } from "sonner"
interface CarpoolFormProps {}

export const CarpoolForm = ({}: CarpoolFormProps) => {
  const submitRef = useRef<React.ElementRef<"button">>(null)
  const [token, setToken] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [price, setPrice] = useState("")
  const [origin, setOrigin] = useState("")
  const [originIsValid, setOriginIsValid] = useState(true)
  const [destination, setDestination] = useState()
  const [destinationIsValid, setDestinationIsValid] = useState(true)
  const [name, setName] = useState("")
  const [nameIsValid, setNameIsValid] = useState(true)
  const [status, setStatus] = useState("Active")
  const [emailIsValid, setEmailIsValid] = useState(true)
  const [number, setNumber] = useState("")
  const [numberIsValid, setNumberIsValid] = useState(true)
  const [date, setDate] = useState("")
  const [dateIsValid, setDateIsValid] = useState(true)
  const [originSuggestionIsOpen, setOriginSuggestionIsOpen] = useState(true)
  const [destinationSuggestionIsOpen, setDestinationSuggestionIsOpen] =
    useState(true)
  const adminEmail = "samuelironkwec@gmail.com"
  const [originIsOpen, setOriginIsOpen] = useState(false)
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

  const [trip, setTrip] = useState<Trip | null>()

  const handleTripDetailsSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    setIsOpen(true)
  }
  const handleDateTimeChange = (date: any) => {
    setDate(date)
  }

  let confirm = true
  const router = useRouter()

  const handleConfirm = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    // create a trip with entered info and send it to api
    if (origin === "") {
      setOriginIsValid(false)
      confirm = false
    }

    if (destination == undefined) {
      setDestinationIsValid(false)
      confirm = false
    }
    if (date === "") {
      setDateIsValid(false)
      confirm = false
    }

    if (confirm && destination != undefined) {
      const userIds: any[] = []
      setTrip({
        id: uuidv4(),
        origin: origin,
        destination_id: "s",
        user_ids: userIds,
        date: date,
        price: 0,
        status: "Active"
      })
      //sendEmail();
    }
  }
  useEffect(() => {
    if (trip != undefined) sendEmail()
  }, [trip])

  async function sendEmail() {
    try {
      const url = "/api/save-trip"
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(trip)
      }

      const response = await fetch(url, options)
      const data = await response.json()
      toast.success("Trip requested!")
      clearForm()
      router.refresh()
    } catch (err) {
      console.error(err)
    }
  }

  function clearForm() {
    setOrigin("")
    setDate("")
    setDestination(undefined)
  }

  let formattedOriginOptions = formatOptions(originPredictions)
  function setOriginAndSuggestions(value: string) {
    setOrigin(value)
    if (value.length > 0) {
      setOriginSuggestionIsOpen(true)
    } else setOriginSuggestionIsOpen(false)
  }

  function onOriginSuggestionClick(value: any) {
    setOrigin(value)
    setOriginSuggestionIsOpen(false)
  }
  function onDestinationSuggestionClick(value: any) {
    setDestination(value)
    setDestinationSuggestionIsOpen(false)
  }
  const destinationRef = useRef<any>()
  const originRef = useRef<any>()
  useEffect(() => {
    const handleOutsideDestinationClick = (event: any) => {
      if (
        destinationRef.current &&
        !(destinationRef.current as HTMLElement).contains(event.target)
      ) {
        // Clicked outside the destination suggestion, close it
        setDestinationSuggestionIsOpen(false)
      }
    }

    // Add event listener when the component mounts
    document.addEventListener("click", handleOutsideDestinationClick)

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleOutsideDestinationClick)
    }
  }, [])
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
        <div className="flex flex-col mb-4 border-input  border w-full p-6 lg:p-12 h-lg shadow-lg rounded-xl shadow-blue-gray-500/40">
          <h1 className="font-medium text-lg ">Pickup from</h1>
          <div className="mt-2 border border-input rounded-xl relative">
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
              className="bg-transparent p-4 placeholder:text-gray-400 text-gray-400 ring-0  rounded-xl ps-10 border  bg-gray-100 border-input outline-none w-full "
            ></input>
          </div>

          {originSuggestionIsOpen && (
            <div
              ref={originRef}
              className={
                formattedOriginOptions.length > 0
                  ? "w-full mt-2 divide-y  rounded-xl shadow bg-background dark:divide-gray-600 "
                  : ""
              }
            >
              {formattedOriginOptions?.map((formatOption, index) => (
                <button
                  onClick={() => onOriginSuggestionClick(formatOption.value)}
                  className="text-md hover:bg-gray-800 flex items-center text-left w-full p-1"
                  key={index}
                >
                  <div className="bg-gray-100 flex rounded-xl justify-center items-center p-2 mr-3">
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
        </div>
      ) : (
        <div
          onClick={() => {
            setDateIsOpen(false)
            setOriginIsOpen(true)
            setDestinationIsOpen(false)
          }}
          className="flex mb-4 flex-col items-center border-input border w-full p-6 lg:p-12 h-lg shadow-lg rounded-xl shadow-blue-gray-500/40"
        >
          <div className="w-full flex flex-col justify-center">
            <span>
              <h1 className=" font-medium   text-lg">Pickup from</h1>
            </span>
          </div>
        </div>
      )}
      {dateIsOpen ? (
        <div className="flex flex-col mb-4 border-input  border w-full p-6 lg:p-12 h-lg shadow-lg rounded-xl shadow-blue-gray-500/40">
          <div className="w-full flex flex-col justify-center">
            <h1 className="font-medium   text-lg">When?</h1>
          </div>
        </div>
      ) : (
        <div
          onClick={() => {
            setDateIsOpen(true)
            setOriginIsOpen(false)
            setDestinationIsOpen(false)
          }}
          className="flex mb-4 flex-col items-center border-input border w-full p-6 lg:p-12 h-lg shadow-lg rounded-xl shadow-blue-gray-500/40"
        >
          <div className="w-full flex flex-col justify-center">
            <span>
              <h1 className=" font-medium   text-lg ">When?</h1>
            </span>
          </div>
        </div>
      )}
    </form>
  )
}
