"use client"

import { Suspense, useEffect, useCallback, useRef, useState } from "react"
import { SubmitButton } from "./submit-button"
import DateTime from "@/components/ui/dateTime"
import { CarpoolGrid } from "../carpool-grid"
import toast, { Toaster } from 'react-hot-toast';
import { Trip } from "@/types";
import { User } from "@supabase/supabase-js"
import Link from "next/link"
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { Resend } from 'resend';
import { EmailTemplate } from "@/components/email-template"
import React, { ChangeEvent, FormEvent } from 'react';

//import useAddressPredictions from "./useAddressPredictions";
import { Loader } from "@googlemaps/js-api-loader"
import { debounce } from "lodash";
import getAddressPredictions from "./getAddressPredictions"

interface CarpoolFormProps {
  user: User | null | undefined
  onClose: () => void;
}


interface AddressProps {
  name: string;
  street_address: string;
  city: string;
  state: string;
  zip_code: string;
  googleMapLink: string;
}

export const CarpoolForm = ({ user, onClose }: CarpoolFormProps) => {
  const submitRef = useRef<React.ElementRef<"button">>(null)
  const [token, setToken] = useState("")
  const [isOpen, setIsOpen] = useState(false);
  const [price, setPrice] = useState('');
  const [origin, setOrigin] = useState('');
  const [originIsValid, setOriginIsValid] = useState(true);
  const [destination, setDestination] = useState('');
  const [destinationIsValid, setDestinationIsValid] = useState(true);
  const [name, setName] = useState('');
  const [nameIsValid, setNameIsValid] = useState(true);
  const [email, setEmail] = useState(user?.email);
  const [status, setStatus] = useState("Pending");
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
  const destinationPredictions = getAddressPredictions(destination);

  const formatOptions = (predictions: string[]): { label: string; value: string }[] => {
    return predictions.map((prediction) => ({
      label: prediction,
      value: prediction, // You can customize how the 'value' is generated
    }));
  };

  const [trip, setTrip] = useState<Trip | null>(
    {
      origin: origin,
      destination: destination,
      id: "",
      date: "",
      user_id: "",
      price: price,
      status: "",
    }
  );


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
        <Link href="/signin" className="inline-flex mt-8 items-center px-[98px] py-3 w-full text-sm font-medium  border rounded-lg  bg-fuchsia-600 text-white border-fuchsia-400	 hover:text-white hover:bg-fuchsia-500">Request <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
        </svg>
        </Link>
      </>)
    }
    else {
      return (<>
        <button onClick={handleConfirm} className="inline-flex mt-8 items-center justify-center  w-full py-3 text-sm font-medium  border rounded-lg  bg-fuchsia-600 text-white border-fuchsia-400 hover:text-white hover:bg-fuchsia-500 ">Request <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
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
      console.log("origin")
    }

    if (destination === "") {
      setDestinationIsValid(false);
      confirm = false;
      console.log("destination")

    }
    if (date === "") {
      setDateIsValid(false);
      confirm = false;
      console.log("date")

    }

    if (confirm) {
      setTrip({
        id: uuidv4(),
        origin: origin,
        destination: destination,
        user_id: user?.id || uuidv4(),
        date: date,
        price: "N/A",
        status: "Pending"
      })
      //sendEmail();
    }
  }
  useEffect(() => {
    if (trip?.date != "") sendEmail();
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
    setDestination("")
  }

  let formattedOriginOptions = formatOptions(originPredictions);
  let formattedDestinationOptions = formatOptions(destinationPredictions);
  function setOriginAndSuggestions(value: string) {
    setOrigin(value);
    if (value.length > 0) {
      setOriginSuggestionIsOpen(true)
    }
    else
      setOriginSuggestionIsOpen(false)
  }
  function setDestinationAndSuggestions(value: string) {
    setDestination(value);
    if (value.length > 0) {
      setDestinationSuggestionIsOpen(true)
    }
    else
      setDestinationSuggestionIsOpen(false)
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
    <div className="flex flex-col justif-center p-4 px-3 h-screen w-full ">
      <div className="max-w-xl">
        <div onClick={() => onClose()} className="mb-4 ml-3 w-8 h-8 flex justify-center items-center rounded-full border border-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>        </div>
        <form onSubmit={handleTripDetailsSubmit} className=" h-fit flex flex-col px-1 justify-center items-center w-full">

          {destinationIsOpen ? (
            <div
              className="flex flex-col mb-4 border-gray-300  border w-full p-6 lg:p-12 h-lg shadow-lg rounded-3xl shadow-blue-gray-500/40">
              <div className="w-full">
                <h1 className="font-mono font-bold  text-black text-lg ">Where to?</h1>

                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                  </div>
                  <input
                    value={destination}
                    onChange={e => setDestinationAndSuggestions(e.target.value)}
                    placeholder={"Search Destinations"}
                    type="search" 
                    className="block w-full p-4 mt-4 ps-10 text-sm text-gray-900 border border-gray-400 rounded-lg bg-gray-100 focus:ring-black focus:border-black  " />
                </div>
                {!destinationIsValid &&
                  <div className="text-red-500 text-left font-mono text-xs">
                    Origin cannot be blank
                  </div>
                }
                {destinationSuggestionIsOpen &&
                  <div
                    ref={destinationRef}
                    className={formattedDestinationOptions.length > 0 ? "w-5/6 lg:w-2/5 z-10 p-2 w-50 absolute mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 left-1/2 transform -translate-x-1/2" : ""}
                  >
                    {formattedDestinationOptions?.map((formatOption, index) => (
                      <button
                        onClick={() => onDestinationSuggestionClick(formatOption.value)}
                        className="text-md hover:bg-gray-100 text-left w-full p-1"
                        key={index}>{formatOption.value}</button>
                    ))}
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
                <h1 className="font-mono font-bold  text-black text-lg">Where to?</h1>
              </span>
            </div>
          </div>}
          {originIsOpen ? (
            <div

              className="flex flex-col mb-4 border-gray-300  border w-full p-6 lg:p-12 h-lg shadow-lg rounded-3xl shadow-blue-gray-500/40">
              <div className="w-full">
                <h1 className="font-mono font-bold  text-black text-lg ">From where?</h1>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                  </div>
                  <input
                    value={origin}
                    onChange={e => setOriginAndSuggestions(e.target.value)}
                    placeholder={"Search"}
                    type="search" 
                    className="block w-full p-4 mt-4 ps-10 text-sm text-gray-900 border border-gray-400 rounded-lg bg-gray-100 focus:ring-black focus:border-black  " />
                </div>

                {!originIsValid &&
                  <div className="text-red-500 text-left font-mono text-xs">
                    Origin cannot be blank
                  </div>
                }
                {originSuggestionIsOpen &&
                  <div
                    ref={originRef}
                    className={formattedOriginOptions.length > 0 ? "w-5/6 lg:w-2/5 z-10 p-2 w-50 absolute mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 left-1/2 transform -translate-x-1/2" : ""}
                  >
                    {formattedOriginOptions?.map((formatOption, index) => (
                      <button
                        onClick={() => onOriginSuggestionClick(formatOption.value)}
                        className="text-md hover:bg-gray-100 text-left w-full p-1"
                        key={index}>{formatOption.value}</button>
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
                <h1 className="font-mono font-bold  text-black text-lg">From where?</h1>
              </span>
            </div>
          </div>}
          {dateIsOpen ? (
            <div

              className="flex flex-col mb-4 border-gray-300  border w-full p-6 lg:p-12 h-lg shadow-lg rounded-3xl shadow-blue-gray-500/40">
              <div className="w-full flex flex-col justify-center">
                <h1 className="font-mono font-bold  text-black text-lg">When?</h1>
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
                <h1 className="font-mono font-bold  text-black text-lg ">When?</h1>
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


    </div >

  )
}




