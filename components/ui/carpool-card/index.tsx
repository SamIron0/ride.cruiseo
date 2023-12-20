import { Trip } from "@/types";
import { X } from 'lucide-react';
import router from "next/router";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { Button, Fieldset } from "@geist-ui/core";
interface CarpoolCardProps {
  trip: Trip
}
export function CarpoolCard({ trip }: CarpoolCardProps) {
  const router = useRouter()
  let innerBg = trip.status == "Pending" ? "bg-yellow-500" : trip.status == "Confirmed" ? "bg-green-500" : "bg-blue-500"
  let outerBg = trip.status == "Pending" ? "bg-yellow-100 text-yellow-800" : trip.status == "Confirmed" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
  const parsedDate = new Date(trip.date);
  // Extract the relevant components
  const month = parsedDate.toLocaleString('en-US', { month: 'short' });
  const day = parsedDate.getDate();
  const hours = parsedDate.getHours() % 12 || 12; // Convert to 12-hour format
  const minutes = parsedDate.getMinutes();
  const amPm = parsedDate.getHours() < 12 ? 'AM' : 'PM';
  const [warningActive, setWarningActive] = useState(false)
  // Construct the formatted date
  const formattedDate = `${month} ${day}, ${hours}:${minutes} ${amPm}`;
  function handleXClick() {
    trip.status == "Pening" ?
      deleteTrip
      : activateWarning()
  }
  function activateWarning() {
    // pop up screen  asking user if they want  to  continue cancelling trip
    setWarningActive(!warningActive)
  }
  async function deleteTrip() {
    try {
      const url = "/api/delete-trip";
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
      toast.success('Trip deleted!')
      router.refresh()
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className=" ">
      {warningActive &&
        <div id="popup-modal" tabIndex={-1} className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center sm:w-full w-7/10 md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div className="relative p-4 w-full max-w-md max-h-full"  >
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button type="button" onClick={activateWarning} className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this trip?</h3>
                <button onClick={() => deleteTrip().then(activateWarning)} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
                  Yes, I'm sure
                </button>
                <button onClick={activateWarning} data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
              </div>
            </div>
          </div>
        </div>
      }
      <Fieldset>
        <Fieldset.Title >
          <span className={`${outerBg} inline-flex self-end items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300`}>
            <span className={`${innerBg} w-2 h-2 me-1 rounded-full`}></span>
            {trip.status}
          </span>
        </Fieldset.Title>
        <Fieldset.Subtitle>
          <div className="flex-1">
            <p className="font-medium ">Origin: <span className="font-normal">{trip.origin}</span></p>
            <p className="font-medium ">Destination: <span className="font-normal">{trip.destination}</span></p>
            <p className="font-medium ">Date: <span className="font-normal">{formattedDate}</span></p>
          </div>
        </Fieldset.Subtitle>
        <Fieldset.Footer>
          <p className="font-medium ">Price: <span className="font-normal">{trip.price}</span></p>
          <Button auto type="secondary" scale={1 / 3} onClick={() => handleXClick()} font="12px">Cancel</Button>        </Fieldset.Footer>
      </Fieldset>
    </div>
  )
}
