"use client"

import Navbar from "@/components/navbar/NavBar"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function ChatPage() {
  return (
    <section className="flex flex-col lg:flex-row items-center lg:justify-between lg:h-screen px-4 lg:px-12 py-12">
      <div className="lg:w-1/2 lg:pr-12">
        <h1 className="text-4xl lg:text-6xl font-bold mb-4">
          Share Your Journey, Share the Cost
        </h1>
        <p className="text-md lg:text-xl mb-8 text-muted">
          Book a trip to your destination and let others join in. Travel
          together, save together.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
          Book Your Trip
        </button>
      </div>
      <div className="lg:w-1/2 mt-8 lg:mt-0">
        <img
          src="/hero.jpg"
          alt="Rideshare Image"
          className="rounded-lg shadow-lg"
        ></img>
      </div>
    </section>
  )
}
