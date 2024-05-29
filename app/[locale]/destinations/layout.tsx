"use client"
import { CruiseoContext } from "@/context/context"
import { Destination } from "@/types"
import { ReactNode, useContext, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/browser-client"
import { getProfileByUserId } from "@/db/profile"
interface RootLayoutProps {
  children: ReactNode
}
export default function RootLayout({ children }: RootLayoutProps) {
  const { setDestinations, setProfile } = useContext(CruiseoContext)
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const userID = await supabase.auth.getUser()
        const url = "/api/getDestinations"
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }

        const response = await fetch(url, options)
        const profile = await getProfileByUserId(userID.data.user?.id as string)
        setProfile(profile)
        setDestinations(await response.json())
      } catch (err) {
        console.error(err)
      }
    }

    fetchDestinations()
  }, [])
  return <> {children}</>
}
