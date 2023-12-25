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
  const [originIsOpen, seOriginIsOpen] = useState(true);
  const [destinationIsOpen, setDestinationIsOpen] = useState(false);
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
        <Link href="/signin" className="inline-flex mt-8 items-center px-[98px] py-2 text-sm font-medium  border rounded-lg  bg-fuchsia-600 text-white border-fuchsia-400	 hover:text-white hover:bg-fuchsia-500">Request <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
        </svg>
        </Link>
      </>)
    }
    else {
      return (<>
        <button onClick={handleConfirm} className="inline-flex mt-8 items-center px-[98px] py-2 text-sm font-medium  border rounded-lg  bg-fuchsia-600 text-white border-fuchsia-400 hover:text-white hover:bg-fuchsia-500 ">Request <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
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
    <div className="overlay">
      <div className="flex  flex-col  p-4 h-screen w-full ">
        <div className="sm:px-24 md:px-36 lg:px-52 ">
          <div onClick={() => setIsOpen(!isOpen)} className="pb-3">
            <svg xmlns="http://www.w3.org/2000/svgf" height="36" viewBox="0 -960 960 960" width="36"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
          </div>
          <form onSubmit={handleTripDetailsSubmit} className=" h-fit flex flex-col px-1 justify-center items-center w-full">
            {originIsOpen ? (<div className="flex z-1 mb-4 flex-col items-center border-gray-300 border w-full p-6 lg:p-12 h-lg shadow-lg rounded-3xl shadow-blue-gray-500/40">
              <div className="w-full flex flex-col justify-center">
                <span>
                  <h1 className="font-mono font-bold  text-black text-lg mb-3">Where to?</h1>
                </span>
                <div className="bg-black mt-5 rounded-xl justify-center shadow-lg h-fit flex flex-col px-1 items-center max-w-lg ">
                  <input
                    value={destination}
                    onChange={e => setDestinationAndSuggestions(e.target.value)}
                    placeholder="Enter a Destination"
                    className="bg-transparent text-white placeholder:text-gray-400 px-2 ring-0  outline-none  text-[16px] font-mono  h-14  w-full"
                  />
                </div>

                {!destinationIsValid &&
                  <div className="text-red-500 text-left font-mono text-xs">
                    Destination cannot be blank
                  </div>
                }
                {destinationSuggestionIsOpen && (
                  <div
                    ref={destinationRef}
                    className={formattedDestinationOptions.length > 0 ? "w-5/6 md:3/5 lg:w-2/5 z-10 p-2 w-50 absolute mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 left-1/2 transform -translate-x-1/2" : ""}
                  >
                    {formattedDestinationOptions?.map((formatOption, index) => (
                      <button
                        onClick={() => onDestinationSuggestionClick(formatOption.value)}
                        className="text-md hover:bg-gray-100 text-left w-full p-1"
                        key={index}>{formatOption.value}</button>
                    ))}
                  </div>
                )}
              </div>

            </div>
            ) : <></>}
            {destinationIsOpen ? (
              <div className="flex z-10 flex-col mb-4 border-gray-300  border w-full p-6 lg:p-12 h-lg shadow-lg rounded-3xl shadow-blue-gray-500/40">
                <div className="w-full">
                  <h1 className="font-mono font-bold  text-black text-lg  mb-3">From where?</h1>
                  <div className="bg-black mt-5 justify-center rounded-xl shadow-lg h-fit flex flex-col px-1 items-center max-w-lg ">
                    <input
                      value={origin}
                      onChange={e => setOriginAndSuggestions(e.target.value)}
                      placeholder="Search Destinations"
                      className="bg-transparent text-white placeholder:text-gray-400 px-2 ring-0  outline-none  text-[16px] font-mono  h-14 w-full "
                    />
                  </div>

                  {!originIsValid &&
                    <div className="text-red-500 text-left font-mono text-xs">
                      Origin cannot be blank
                    </div>
                  }
                  {originSuggestionIsOpen &&
                    <div
                      ref={originRef}
                      className={formattedOriginOptions.length > 0 ? "w-5/6 md:3/5 lg:w-2/5 z-10 p-2 w-50 absolute mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 left-1/2 transform -translate-x-1/2" : ""}
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
            ) : <></>}
            {dateIsOpen ? (
              <div className="flex flex-col z-20 mb-4 border-gray-300  border w-full p-6 lg:p-12 h-lg shadow-lg rounded-3xl shadow-blue-gray-500/40">
                <div className="w-full flex flex-col justify-center">
                  <h1 className="font-mono font-bold  text-black text-lg  mb-3">When?</h1>

                  <DateTime onDateTimeChange={handleDateTimeChange} />

                </div>
              </div>
            ) : <></>
            }
            <>
              {requestButton()}
            </>
          </form >
          <div>

            <Toaster
              position="top-center"
              reverseOrder={false}
            /></div>
        </div >


      </div>
    </div>

  )
}




