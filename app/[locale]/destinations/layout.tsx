"use client"
import { retrieveDestinations } from "@/db/listings"
import { Destination } from "@/types"
import { ReactNode, useEffect, useState } from "react"

interface RootLayoutProps {
  children: ReactNode
}
export default async function RootLayout({ children }: RootLayoutProps) {
  const [destinations, setDestinations] = useState<Destination[] | null>([])

  useEffect(() => {
    const fetchDestinations = async () => {
      const x = await retrieveDestinations()
      setDestinations(x)
    }

    fetchDestinations()
  }, [])
  return <> {children}</>
}
