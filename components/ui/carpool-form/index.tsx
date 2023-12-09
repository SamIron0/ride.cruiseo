"use client"

import { Suspense, useEffect, useRef, useState } from "react"
import { SubmitButton } from "./submit-button"
import DateTime from "@/components/ui/dateTime"
import { CarpoolGrid } from "../carpool-grid"
import toast, { Toaster } from 'react-hot-toast';
import { Trip } from "@/types";
import { User } from "@supabase/supabase-js"
import Link from "next/link"

interface CarpoolFormProps {
  user: User | null | undefined
}


export function CarpoolForm({ user }: CarpoolFormProps) {
  const submitRef = useRef<React.ElementRef<"button">>(null)
  const [token, setToken] = useState("")
  const [isOpen, setIsOpen] = useState(false);
  const [origin, setOrigin] = useState('');
  const [originIsValid, setOriginIsValid] = useState(true);
  const [destination, setDestination] = useState('');
  const [destinationIsValid, setDestinationIsValid] = useState(true);
  const [name, setName] = useState('');
  const [nameIsValid, setNameIsValid] = useState(true);
  const [email, setEmail] = useState(user?.email);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [number, setNumber] = useState('');
  const [numberIsValid, setNumberIsValid] = useState(true);
  const [date, setDate] = useState('');
  const [dateIsValid, setDateIsValid] = useState(true);
  const adminEmail = "samuelironkwec@gmail.com"
  const [trip, setTrip] = useState<Trip | null>({
    origin: origin,
    destination: destination,
    email: email,
    date: date
  });

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
        <Link href="/signin" className="inline-flex mt-8 items-center px-[106px] py-2 text-sm font-medium  border rounded-lg  bg-gray-800 text-white border-gray-600 hover:text-white hover:bg-gray-700">Request
        </Link>
      </>)
    }
    else {
      return (<>
        <button onClick={handleConfirm} className="inline-flex mt-8 items-center px-[106px] py-2 text-sm font-medium  border rounded-lg  bg-gray-800 text-white border-gray-600 hover:text-white hover:bg-gray-700 ">Request
        </button>
      </>)
    }
  }
  const handleConfirm = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    let confirm = true;
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
        origin: origin,
        destination: destination,
        email: email,
        date: date
      });
      toast.success('Trip requested!')
    }
  }

  useEffect(() => {
    if (origin !== "")
      sendEmail();
  }, [trip]);

  async function sendEmail() {
    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(trip,)
      })
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }


  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleTripDetailsSubmit} className=" h-fit flex flex-col px-1 items-center w-full px-4">
        <div className="bg-black mt-5 rounded-xl shadow-lg h-fit flex flex-col px-1 items-center w-full ">

          <input
            value={origin}
            onChange={e => setOrigin(e.target.value)}
            type="text"
            name="prompt"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                submitRef.current?.click()
              }
            }}
            placeholder="Enter an Origin"
            className="bg-transparent text-white placeholder:text-gray-400 ring-0 outline-none resize-none py-4 px-2 font-mono text-sm h-10 w-full transition-all duration-300"
          />

        </div>
        {!originIsValid &&
          <div className="text-red-500 text-left font-mono text-xs">
            Origin cannot be blank
          </div>
        }
        <div className="bg-black mt-5 rounded-xl shadow-lg h-fit flex px-1 w-full ">
          <input
            value={destination}
            onChange={e => setDestination(e.target.value)}
            type="text"
            name="prompt"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                submitRef.current?.click()
              }
            }}
            placeholder="Enter a Destination"
            className="bg-transparent text-white placeholder:text-gray-400 ring-0 outline-none resize-none py-4 px-2 font-mono text-sm h-10 w-full transition-all duration-300"
          />
          {!destinationIsValid &&
            <p className="text-red-500 mb-5 font-mono text-sm">
              Destination cannot be blank
            </p>
          }
        </div>


        <DateTime onDateTimeChange={handleDateTimeChange} />
        {requestButton()}
      </form>
    </div>
  )
}
function saveSettings(settings: any): Promise<unknown> {
  throw new Error("Function not implemented.")
}

