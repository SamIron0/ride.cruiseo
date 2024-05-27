"use client"
import { Destination } from "@/types"
import { ReactNode, useEffect, useState } from "react"

interface RootLayoutProps {
  children: ReactNode
}
export default async function RootLayout({ children }: RootLayoutProps) {
  const [destinations, setDestinations] = useState<Destination[] | null>([])

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
      } catch (err) {
        console.error(err)
      }
    }

    fetchDestinations()
  }, [])
  return <> {children}</>
}
