"use client"

import { Suspense, useEffect, useRef, useState } from "react"
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

interface CarpoolFormProps {
  user: User | null | undefined
}


export function CarpoolForm({ user }: CarpoolFormProps) {
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
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [number, setNumber] = useState('');
  const [numberIsValid, setNumberIsValid] = useState(true);
  const [date, setDate] = useState('');
  const [dateIsValid, setDateIsValid] = useState(true);
  const adminEmail = "samuelironkwec@gmail.com"
  const [trip, setTrip] = useState<Trip | null>(
    {
      origin: origin,
      destination: destination,
      id: "",
      date: "",
      user_id: "",
      price: price
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
        <Link href="/signin" className="inline-flex mt-8 items-center px-[98px] py-2 text-sm font-medium  border rounded-lg  bg-gray-800 text-white border-gray-600 hover:text-white hover:bg-gray-700">Request <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
        </svg>
        </Link>
      </>)
    }
    else {
      return (<>
        <button onClick={handleConfirm} className="inline-flex mt-8 items-center px-[98px] py-2 text-sm font-medium  border rounded-lg  bg-gray-800 text-white border-gray-600 hover:text-white hover:bg-gray-700 ">Request <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
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
        price: price
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
      //console.log(data);
      toast.success('Trip requested!')
      router.refresh()

    } catch (err) {
      console.error(err);
    }
  }

  const center = { lat: 50.064192, lng: -130.605469 };
  // Create a bounding box with sides ~10km away from the center point
  const defaultBounds = {
    north: center.lat + 0.1,
    south: center.lat - 0.1,
    east: center.lng + 0.1,
    west: center.lng - 0.1,
  };
  const input = document.getElementById("pac-input") as HTMLInputElement;
  const options = {
    bounds: defaultBounds,
    componentRestrictions: { country: "us" },
    fields: ["address_components", "geometry", "icon", "name"],
    strictBounds: false,
  };

  const autocomplete = new google.maps.places.Autocomplete(inputRef.current, options);

  return (
    <div className="flex flex-col items-center">

      <form onSubmit={handleTripDetailsSubmit} className=" h-fit flex flex-col px-1 items-center w-full px-4">
        <div className="bg-black mt-5 rounded-xl shadow-lg h-fit flex flex-col px-1 items-center w-full ">

          <input
            ref={inputRef}
            value={origin}
            onChange={e => setOrigin(e.target.value)}
            placeholder="Enter an Origin"
            className="bg-transparent text-white placeholder:text-gray-400 px-2 ring-0  outline-none  text-[16px] font-mono  h-10 w-full "
          />

        </div>
        {!originIsValid &&
          <div className="text-red-500 text-left font-mono text-xs">
            Origin cannot be blank
          </div>
        }
        <div className="bg-black mt-5 rounded-xl shadow-lg h-fit flex px-1 w-full ">

          <input
            onChange={e => setDestination(e.target.value)}
            placeholder="Enter a Destination"
            className="bg-transparent text-white placeholder:text-gray-400 px-2 ring-0  outline-none  text-[16px] font-mono  h-10 w-full "
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
      <div><Toaster
        position="top-center"
        reverseOrder={false}
      /></div>
    </div>
  )
}
function saveSettings(settings: any): Promise<unknown> {
  throw new Error("Function not implemented.")
}

