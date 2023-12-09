import { User } from "@supabase/supabase-js"
import { CarpoolCard } from "../carpool-card"

interface CarpoolGridProps {
  user: User
}

export function CarpoolGrid({ user }: CarpoolGridProps) {
  const trips = [{
    "id": "",
    "origin": "",
    "destination": "",
    "date": ""
  },
  {
    "id": "",
    "origin": "",
    "destination": "",
    "date": ""
  }]
  

  return (
    <div className="animate-in fade-in mt-36 slide-in-from-bottom-4 duration-1200 w-full ease-in-out">
      <h2 className="font-semibold text-md text-left w-full mb-3">"My Trips</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-items-stretch w-full">
        {trips.map((trip) => (
          <CarpoolCard key={trip.id} user={user} />
        ))}
      </div>
    </div>
  )
}