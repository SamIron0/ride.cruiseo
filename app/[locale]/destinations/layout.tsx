"use client"
import { retrieveDestinations } from "@/db/listings"
import { Destination } from "@/types"
import { ReactNode, useState } from "react"

interface RootLayoutProps {
  children: ReactNode
}
export default async function RootLayout({ children }: RootLayoutProps) {
  const [destinations, setDestinations] = useState<Destination[] | null>([])

  const x = await retrieveDestinations()
  setDestinations(x)
  return <div> {children}</div>
}
