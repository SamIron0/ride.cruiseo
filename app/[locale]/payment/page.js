'use client'
import React, { useCallback } from "react"
import { loadStripe } from "@stripe/stripe-js"
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from "@stripe/react-stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function App() {
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
    <div id="checkout" className='w-full'>
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options} style={{ base: { width: '100%' } }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}
