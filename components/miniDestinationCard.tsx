import { Destination, Trip } from "@/types";
import { getTrip } from "@/utils/supabase-admin";
import { useState } from "react";

interface DestinationCardProps {
  destination: Destination | undefined
}
export function MiniDestinationCard({ destination }: DestinationCardProps) {
  return (
      <div
        className="relative -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl shadow-blue-gray-500/40">
        <img
          src={destination?.photo}
          alt="card-image"
          className="" />
      </div>


  )
}
