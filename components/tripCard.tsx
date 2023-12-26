import { Trip } from "@/types";

interface TripCardProps {
  trip: any
}
export function TripCard({ trip }: TripCardProps) {
  return (
    <div className="relative flex flex-col mt-6 text-gray-700 ">
      <div
        className="relative -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl shadow-blue-gray-500/40">
        <img
          src={trip.image}
          alt="card-image"
          className="" />
      </div>
      <div className="pt-3">
        <h5 className="block font-sans text-lg antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          {trip.title}
        </h5>
        <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
          Next arrives: {trip.times}
        </p>
      </div>
    </div>
  )
}
