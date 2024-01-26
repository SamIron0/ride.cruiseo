"use client"

import { Suspense, useEffect, useCallback, useRef, useState } from "react"
import { SubmitButton } from "./submit-button"
import DateTime from "@/components/ui/dateTime"
import toast, { Toaster } from 'react-hot-toast';
import { Destination, Trip } from "@/types";
import { User } from "@supabase/supabase-js"
import Link from "next/link"
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { Resend } from 'resend';
import { EmailTemplate } from "@/components/email-template"
import React, { ChangeEvent, FormEvent } from 'react';

import { MiniDestinationCard } from "@/components/miniDestinationCard"
import { Loader } from "@googlemaps/js-api-loader"
import { debounce } from "lodash";
import getAddressPredictions from "./getAddressPredictions"

interface CarpoolFormProps {
  user: User | null | undefined
  onClose: () => void;
  selectedDestination: Destination | undefined;
  allDestinations: Destination[]
}

export const CarpoolForm = ({ user, onClose, selectedDestination, allDestinations }: CarpoolFormProps) => {
  const submitRef = useRef<React.ElementRef<"button">>(null)
  const [token, setToken] = useState("")
  const [isOpen, setIsOpen] = useState(false);
  const [price, setPrice] = useState('');
  const [origin, setOrigin] = useState('');
  const [originIsValid, setOriginIsValid] = useState(true);
  const [destination, setDestination] = useState(selectedDestination);
  const [destinationIsValid, setDestinationIsValid] = useState(true);
  const [name, setName] = useState('');
  const [nameIsValid, setNameIsValid] = useState(true);
  const [email, setEmail] = useState(user?.email);
  const [status, setStatus] = useState("Active");
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [number, setNumber] = useState('');
  const [numberIsValid, setNumberIsValid] = useState(true);
  const [date, setDate] = useState('');
  const [dateIsValid, setDateIsValid] = useState(true);
  const [originSuggestionIsOpen, setOriginSuggestionIsOpen] = useState(true);
  const [destinationSuggestionIsOpen, setDestinationSuggestionIsOpen] = useState(true);
  const adminEmail = "samuelironkwec@gmail.com"
  const [originIsOpen, setOriginIsOpen] = useState(false);
  const [destinationIsOpen, setDestinationIsOpen] = useState(true);
  const [dateIsOpen, setDateIsOpen] = useState(false);
  //const [prediction, setPredictions] = useState<any>();
  const originPredictions = getAddressPredictions(origin);
  //const destinationPredictions = getAddressPredictions(destination);

  const formatOptions = (predictions: string[]): { label: string; value: string }[] => {
    return predictions.map((prediction) => ({
      label: prediction,
      value: prediction, // You can customize how the 'value' is generated
    }));
  };

  const [trip, setTrip] = useState<Trip | null>();


  const handleTripDetailsSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    setIsOpen(true)
  }
  const handleDateTimeChange = (date: any) => {
    setDate(date)
  }
  const requestButton = () => {
    if (!user) {
      return (<>
        <Link href="/signin" className="inline-flex mt-8 items-center px-[98px] justify-center py-3 w-full text-sm font-medium  border rounded-lg  bg-fuchsia-600 text-white border-fuchsia-400	 hover:text-white hover:bg-fuchsia-500">Request <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
        </svg>
        </Link>
      </>)
    }
    else {
      return (<>
        <button onClick={handleConfirm} className="inline-flex mt-8 items-center  justify-center w-full py-3 text-sm font-medium  border rounded-lg  bg-fuchsia-600 text-white border-fuchsia-400 hover:text-white hover:bg-fuchsia-500 ">Request <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
        </svg>
        </button>
      </>)
    }
  }

  let confirm = true;
  const router = useRouter()

  const handleConfirm = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    // create a trip with entered info and send it to api
    if (origin === "") {
      setOriginIsValid(false);
      confirm = false;
    }

    if (destination == undefined) {
      setDestinationIsValid(false);
      confirm = false;
    }
    if (date === "") {
      setDateIsValid(false);
      confirm = false;
    }

    if (confirm && destination != undefined) {
      const userIds: any[] = []
      userIds.push(user?.id)
      setTrip({
        id: uuidv4(),
        origin: origin,
        destination_id: destination.id,
        user_ids: userIds,
        date: date,
        price: 0,
        status: "Active"
      })
      //sendEmail();
    }
  }
  useEffect(() => {
    if (trip != undefined)
      sendEmail();
  }, [trip]);

  async function sendEmail() {
    try {
      const url = "/api/save-trip";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trip),
      };

      const response = await fetch(url, options);
      const data = await response.json();
      toast.success('Trip requested!')
      clearForm();
      router.refresh()

    } catch (err) {
      console.error(err);
    }
  }

  function clearForm() {
    setOrigin("")
    setDate("")
    setDestination(undefined)
  }

  let formattedOriginOptions = formatOptions(originPredictions);
  //let formattedDestinationOptions = formatOptions(destinationPredictions);
  function setOriginAndSuggestions(value: string) {
    setOrigin(value);
    if (value.length > 0) {
      setOriginSuggestionIsOpen(true)
    }
    else
      setOriginSuggestionIsOpen(false)
  }
  function setDestinationAndSuggestions(value: Destination) {
    setDestination(value);
  }
  function onOriginSuggestionClick(value: any) {
    setOrigin(value);
    setOriginSuggestionIsOpen(false)

  }
  function onDestinationSuggestionClick(value: any) {
    setDestination(value);
    setDestinationSuggestionIsOpen(false)
  }
  const destinationRef = useRef<any>();
  const originRef = useRef<any>();
  useEffect(() => {
    const handleOutsideDestinationClick = (event: any) => {
      if (destinationRef.current && !(destinationRef.current as HTMLElement).contains(event.target)) {
        // Clicked outside the destination suggestion, close it
        setDestinationSuggestionIsOpen(false);
      }
    };

    // Add event listener when the component mounts
    document.addEventListener('click', handleOutsideDestinationClick);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleOutsideDestinationClick);
    };
  }, []);
  useEffect(() => {
    const handleOutsideOriginClick = (event: any) => {
      if (originRef.current && !(originRef.current as HTMLElement).contains(event.target)) {
        // Clicked outside the destination suggestion, close it
        setOriginSuggestionIsOpen(false);
      }
    };
    // Add event listener when the component mounts
    document.addEventListener('click', handleOutsideOriginClick);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleOutsideOriginClick);
    };
  }, []);
  return (
    <div className="flex flex-col items-center 2xl:px-22  h-screen w-full ">
      <div className="w-full flex p-6 flex-col items-center justify-center">
        <div className="w-full sm:px-28 md:px-44 lg:px-72 xl:px-96  3xl:[450px] pt-2 h-full">
          <div onClick={() => onClose()} className="mb-4 ml-3 w-8 h-8 flex justify-center hover:scale-110 items-center rounded-full border border-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>        </div>
          <form onSubmit={handleTripDetailsSubmit} className=" h-fit flex flex-col items-center px-1 justify-center  w-full">

            {destinationIsOpen ? (
              <div
                className="flex flex-col mb-4 border-gray-300  border w-full p-6 lg:p-12 h-lg shadow-lg rounded-3xl shadow-blue-gray-500/40">
                <div className="w-full">
                  <h1 className=" font-semibold  text-black text-lg ">Where to?</h1>
                  <div className="relative overflow-hidden w-full h-40">
                    {
                      allDestinations.map((destination) => (
                        <MiniDestinationCard destination={destination} />
                      ))

                    }
                    <div className="absolute inset-y-0 right-0 z-10 bg-black w-1/12"></div>
                  </div>
                  {!destinationIsValid &&
                    <div className="text-red-500 text-left  text-xs">
                      Destination cannot be blank
                    </div>
                  }

                </div>
              </div>
            ) : <div
              onClick={() => {
                setDateIsOpen(false);
                setOriginIsOpen(false);
                setDestinationIsOpen(true);
              }}
              className="flex mb-4 flex-col items-center border-gray-300 border w-full p-6 lg:p-12 h-lg shadow-lg rounded-3xl shadow-blue-gray-500/40">
              <div className="w-full flex flex-col justify-center">

                <span>
                  <h1 className=" font-bold  text-black text-lg">Where to?</h1>
                </span>
              </div>
            </div>}
            {originIsOpen ? (
              <div

                className="flex flex-col mb-4 border-gray-300  border w-full p-6 lg:p-12 h-lg shadow-lg rounded-3xl shadow-blue-gray-500/40">
                <div className="w-full">
                  <h1 className=" font-semibold  text-black text-lg ">From where?</h1>
                  <div className="mt-2  relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                      </svg>
                    </div>
                    <input
                      value={origin}
                      onChange={e => setOriginAndSuggestions(e.target.value)}
                      placeholder={"Search"}
                      className="bg-transparent p-4 placeholder:text-gray-400 text-gray-900 ring-0  rounded-lg ps-10 border focus:ring-black focus:border-black bg-gray-100 border-gray-400 outline-none w-full ">

                    </input>
                  </div>

                  {!originIsValid &&
                    <div className="text-red-500 text-left  text-xs">
                      Origin cannot be blank
                    </div>
                  }
                  {originSuggestionIsOpen &&
                    <div
                      ref={originRef}
                      className={formattedOriginOptions.length > 0 ? "w-5/6 sm:w-3/5 md:w-3/6 lg:w-3/7 xl:w-2/5 z-10 p-2 w-50 absolute mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 left-1/2 transform -translate-x-1/2" : ""}
                    >
                      {formattedOriginOptions?.map((formatOption, index) => (
                        <button
                          onClick={() => onOriginSuggestionClick(formatOption.value)}
                          className="text-md hover:bg-gray-100 flex items-center text-left w-full p-1"
                          key={index}>
                          <div className="bg-gray-100 flex rounded-xl justify-center items-center p-2 mr-3"> <svg xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 -960 960 960" width="26"><path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" /></svg></div>
                          {formatOption.value}
                        </button>
                      ))}
                    </div>
                  }
                </div>
              </div>
            ) : <div
              onClick={() => {
                setDateIsOpen(false);
                setOriginIsOpen(true);
                setDestinationIsOpen(false);
              }}
              className="flex mb-4 flex-col items-center border-gray-300 border w-full p-6 lg:p-12 h-lg shadow-lg rounded-3xl shadow-blue-gray-500/40">
              <div className="w-full flex flex-col justify-center">

                <span>
                  <h1 className=" font-bold  text-black text-lg">From where?</h1>
                </span>
              </div>
            </div>}
            {dateIsOpen ? (
              <div

                className="flex flex-col mb-4 border-gray-300  border w-full p-6 lg:p-12 h-lg shadow-lg rounded-3xl shadow-blue-gray-500/40">
                <div className="w-full flex flex-col justify-center">
                  <h1 className=" font-semibold  text-black text-lg">When?</h1>
                  <DateTime onDateTimeChange={handleDateTimeChange} />

                </div>
              </div>
            ) : <div
              onClick={() => {
                setDateIsOpen(true);
                setOriginIsOpen(false);
                setDestinationIsOpen(false);
              }}
              className="flex mb-4 flex-col items-center border-gray-300 border w-full p-6 lg:p-12 h-lg shadow-lg rounded-3xl shadow-blue-gray-500/40">
              <div className="w-full flex flex-col justify-center">

                <span>
                  <h1 className=" font-bold  text-black text-lg ">When?</h1>
                </span>
              </div>
            </div>
            }
            <div className="w-full">
              {requestButton()}
            </div>
          </form >
          <div>

            <Toaster
              position="top-center"
              reverseOrder={false}
            /></div>
        </div >
      </div>

    </div >

  )
}




