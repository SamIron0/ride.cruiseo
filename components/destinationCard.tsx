import { Destination, Trip } from "@/types";
import { getTrip } from "@/utils/supabase-admin";
import { useState } from "react";

interface DestinationCardProps {
  destination: Destination
}
export function DestinationCard({ destination }: DestinationCardProps) {
  const result: string[] = [];
  function times(dates: string[] | undefined | null) {
    dates?.map((date) => {
      const originalDate = new Date(date);

      // Get hours and minutes
      const hours = originalDate.getHours();
      const minutes = originalDate.getMinutes();

      // Format the time as "H:mm"
      result.push(`${hours}:${minutes.toString().padStart(2, '0')}`)

    })

    return result // Output: "22:00"
  }
  return (
    <>
      <div className="relative flex flex-col mt-6 text-gray-700 ">
        <div
          className="relative -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl shadow-blue-gray-500/40">
          <img
            src={destination.photo}
            alt="card-image"
            className="" />
        </div>
        <div className="pt-3">
          <h5 className="block font-sans text-md antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            {destination.name}
          </h5>

          <p className="block text-sm font-sans antialiased font-light leading-relaxed text-inherit">
            {destination.address}
          </p>
          <p className="block text-sm font-sans antialiased font-light leading-relaxed text-inherit">
            Arrives:{times(destination.times)}
          </p>
        </div>
      </div></>
  )
}
