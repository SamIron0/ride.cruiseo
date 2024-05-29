import { Trip } from "@/types"
import { Button } from "./ui/button"
import { DrawerClose, DrawerFooter } from "./ui/drawer"
import React, { useCallback } from "react"
import { loadStripe } from "@stripe/stripe-js"
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from "@stripe/react-stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "")

interface CheckoutProps {
  selectedTrip: Trip
  onBackClick: () => void
}
export const Checkout = ({ selectedTrip, onBackClick }: CheckoutProps) => {
  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch("/api/checkout_sessions", {
      method: "POST"
    })
      .then(res => res.json())
      .then(data => data.clientSecret)
  }, [])

  const options = { fetchClientSecret }

  return (
    <div className="grid px-4  sm:px-10  sm:max-h-96 max-h-[450px] overflow-y-auto ">
      <button
        onClick={() => onBackClick()}
        type="button"
        className="w-32 flex items-center justify-center px-5 py-2 text-sm text-gray-700 transition-all duration-200 bg-white border rounded-lg gap-x-2 dark:hover:bg-zinc-800 dark:bg-background dark:text-zinc-200 dark:border-input hover:scale-105 active:scale-90"
      >
        <svg
          className="w-5 h-5 rtl:rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
          />
        </svg>
        <span>Go back</span>
      </button>
      <div className="pt-4">
        <p className="text-zinc-300">Order Summary</p>
        <div className="mt-8 space-y-3 rounded-lg border bg-transparent px-2 py-4 sm:px-6">
          <div className="flex flex-col sm:items-center rounded-lg sm:flex-row">
            <img
              className="m-2 h-24 w-28 rounded-md border object-cover object-center"
              src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
            <div className="flex w-full flex-col px-4 py-4">
              <span className="font-semibold">
                {" "}
                Leaving: {selectedTrip.date?.date}
              </span>
              <span className="float-right text-zinc-300">Origin: Wal</span>
              <span className="float-right text-zinc-300">
                Destination: {selectedTrip.destination?.address}
              </span>

              <p className="text-lg font-bold">${selectedTrip.price}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 bg-background px-4 pt-8 lg:mt-0">
      <div id="checkout" className='w-full'>
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options} >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div> 
       
        <DrawerFooter>
          <DrawerClose className="p-0 mt-2 mb-4">
            <Button className="w-full" variant="outline">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </div>
  )
}
