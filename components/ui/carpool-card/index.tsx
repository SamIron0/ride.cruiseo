import { Trip } from "@/types";
import { X } from 'lucide-react';
import router from "next/router";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';

interface CarpoolCardProps {
  trip: Trip
}


export function CarpoolCard({ trip }: CarpoolCardProps) {
  const router = useRouter()
  let innerBg = trip.status == "Pending" ? "bg-yellow-500" : trip.status == "Confirmed" ? "bg-green-500" : "bg-blue-500"
  let outerBg = trip.status == "Pending" ? "bg-yellow-100 text-yellow-800" : trip.status == "Confirmed" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
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
    <div className="bg-gray-200 p-2 border border-1 rounded-md ">
      <div className="flex items-center h-full space-x-4 rtl:space-x-reverse">
        <div className="flex-1 w-7/10">
          <p className="text-sm flex  font-semibold text-gray-900 truncate dark:text-white">
            Origin: <p className="text-sm pl-1 text-gray-500 truncate dark:text-gray-400">
              {trip.origin}</p>
          </p>
          <p className="text-sm flex font-semibold text-gray-900 truncate dark:text-white">
            Destination: <p className="text-sm pl-1  text-gray-500 truncate dark:text-gray-400">
              {trip.destination}</p>
          </p>
          <p className="text-sm flex font-semibold text-gray-900 truncate dark:text-white">
            Price: <p className="text-sm pl-1   text-gray-500 truncate dark:text-gray-400">
              {trip.price}</p>
          </p>
          <p className="text-sm flex font-semibold text-gray-900 truncate dark:text-white">
            Pickup: <p className="text-sm pl-1 text-gray-500 truncate dark:text-gray-400">
              {trip.date}</p>
          </p>
        </div>
        <div className="flex-1 h-full relative">
          <X
            size={20}
            color="black"
            onClick={deleteTrip}
            className="absolute top-0 right-0"
            style={{ transition: 'all 0.3s ease', cursor: 'pointer' }}
            onMouseOver={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'scale(1.1)';
            }}
            onMouseOut={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'scale(1.0)';
            }}
            onMouseDown={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'scale(0.9)';
            }}
            onMouseUp={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'scale(1.0)';
            }}
          />
          <span className={`${outerBg} absolute bottom-0 right-0 inline-flex self-end items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300`}>
            <span className={`${innerBg} w-2 h-2 me-1 rounded-full`}></span>
            {trip.status}
          </span>
        </div>
      </div>
    </div>
  )
}
