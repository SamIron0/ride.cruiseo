"use client"
import { CruiseoContext } from "@/context/context"
import { Destination } from "@/types"
import { ReactNode, useContext, useEffect, useState } from "react"

interface RootLayoutProps {
  children: ReactNode
}
export default async function RootLayout({ children }: RootLayoutProps) {
  const { setDestinations } = useContext(CruiseoContext)
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const url = "/api/getDestinations"
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }

        const response = await fetch(url, options)
        setDestinations(await response.json())
      } catch (err) {
        console.error(err)
      }
    }

    fetchDestinations()
  }, [])
  return <> {children}</>
}
