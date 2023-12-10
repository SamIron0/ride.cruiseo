
import { User } from "@supabase/supabase-js"
import { CarpoolCard } from "../carpool-card"
import { Trip } from "@/types";
import { Json } from "@/types_db";
import { useState } from "react";
import { UserDetails } from "@/types";

interface CarpoolGridProps {
  user: User;
  trips: Trip[] | null | undefined;
}

export function CarpoolGrid({ user, trips }: CarpoolGridProps) {
  let usersTrips: Trip[] = [];

  trips?.map(j => (
    usersTrips.push({
      id: j.id,
      user_id: user.id,
      origin: j?.origin,
      destination: j.destination,
      date: j.date,
      price: j.price
    })));


  return (
    <div className="animate-in fade-in mt-36 slide-in-from-bottom-4 duration-1200 w-full ease-in-out">
      <h2 className="font-semibold text-md text-left w-full mb-3">My Trips</h2>
      <div className="grid gƒrid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-items-stretch w-full">
        {usersTrips?.map((trip) => (
          <>
            <CarpoolCard trip={trip} /></>
        ))}
      </div>
    </div>
  )
}