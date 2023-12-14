
import { User } from "@supabase/supabase-js"
import { CarpoolCard } from "../carpool-card"
import { Trip } from "@/types";

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
      price: j.price,
      status: j.status
    })));


  return (
    <div className="animate-in fade-in p-8 sm:p-12  mt-36 slide-in-from-bottom-4 duration-1200 w-full ease-in-out">
      <h2 className="font-semibold text-md text-left w-full mb-3">My Trips</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 justify-items-stretch w-full">
        {usersTrips?.map((trip) => (
          <>
            <CarpoolCard trip={trip} /></>
        ))}
      </div>
    </div>
  )
}