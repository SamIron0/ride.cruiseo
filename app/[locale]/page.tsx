"use client"

import Container from "@/components/Container"
import Logo from "@/components/navbar/Logo"
import UserMenu from "@/components/navbar/UserMenu"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"

export default async function ChatPage() {
  return (
    <>
      <Container>
        <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
          <Logo />
          <UserMenu />
        </div>
      </Container>
      <div className=" px-6 ">
        <section className="flex flex-col lg:flex-row items-center lg:justify-between lg:h-screen md:px-12 lg:px-16 py-12">
          <div className="lg:w-1/2 lg:pr-12">
            <h1 className="text-4xl text-zinc-200 lg:text-6xl font-bold mb-4">
              Share Your Journey, Share the Cost
            </h1>
            <p className="text-lg lg:text-xl mb-8 text-zinc-500">
              Book a trip to your destination and let others join in. Travel
              together, save together.
            </p>
            <div className="flex flex-row gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded-lg">
                Sign up to ride
              </button>
              <button className="bg-zinc-200 hover:bg-zinc-300 text-black font-semibold py-3 px-5 rounded-lg">
                Apply to drive
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <img
              src="/hero.jpg"
              alt="Rideshare Image"
              className="rounded-lg shadow-lg"
            ></img>
          </div>
        </section>
        <section className="md:px-12 lg:px-16 py-12 bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                <img
                  src="https://via.placeholder.com/64"
                  alt="Icon 1"
                  className="w-16 h-16"
                ></img>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Easy Booking
              </h2>
              <p className="text-gray-600">
                Quickly book your trip with a few clicks, and get ready to share
                your journey.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                <img
                  src="https://via.placeholder.com/64"
                  alt="Icon 2"
                  className="w-16 h-16"
                >
                  {" "}
                </img>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Cost Sharing
              </h2>
              <p className="text-gray-600">
                Save money by sharing the travel costs with others heading in
                the same direction.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                <img
                  src="https://via.placeholder.com/64"
                  alt="Icon 3"
                  className="w-16 h-16"
                ></img>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Safe and Reliable
              </h2>
              <p className="text-gray-600">
                Travel with verified drivers and passengers for a safe and
                reliable experience.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                <img
                  src="https://via.placeholder.com/64"
                  alt="Icon 4"
                  className="w-16 h-16"
                ></img>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Eco-Friendly
              </h2>
              <p className="text-gray-600">
                Reduce your carbon footprint by sharing rides and promoting
                sustainable travel.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
