"use client"

import Container from "@/components/Container"
import Logo from "@/components/navbar/Logo"
import UserMenu from "@/components/navbar/UserMenu"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"

export default function ChatPage() {
  return (
    <>
      <div className="fixed w-full z-10 shadow-sm  shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
        <div className="py-4 sm:px-4 border-[#232325] border-b-[1px]">
          <Container>
            <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
              <Logo />
              <UserMenu />
            </div>
          </Container>
        </div>
      </div>
      <div className="mt-16 px-6 ">
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
            />
          </div>
        </section>
      </div>
      <section className="md:px-12 lg:px-16 py-12 bg-white w-full">
        <div className="max-w-5xl px-6 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className=" flex justify-center">
            <div className="flex flex-col ">
              <div className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-12"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Easy Booking
              </h2>
              <p className="text-gray-600">
                Quickly book your trip with a few clicks, and get ready to share
                your journey.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="flex flex-col ">
              <div className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-12"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Cost Sharing
              </h2>
              <p className="text-gray-600">
                Save money by sharing the travel costs with others heading in
                the same direction.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="flex flex-col">
              <div className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-12"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Safe and Reliable
              </h2>
              <p className="text-gray-600">
                Travel with verified drivers and passengers for a safe and
                reliable experience.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="md:px-12 lg:px-16 py-12  w-full">
        <Accordion
          type="single"
          collapsible
          className="w-full mx-auto max-w-3xl px-6"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </>
  )
}
