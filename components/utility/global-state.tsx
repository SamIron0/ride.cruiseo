// TODO: Separate into multiple contexts, keeping simple for now

"use client"
import { CruiseoContext } from "@/context/context"
import { getProfileByUserId } from "@/db/profile"
import { supabase } from "@/lib/supabase/browser-client"
import { Tables } from "@/supabase/types"
import { Destination, Trip } from "@/types"
import { FC, useEffect, useState } from "react"

interface GlobalStateProps {
  children: React.ReactNode
}

export const GlobalState: FC<GlobalStateProps> = ({
  children
}: GlobalStateProps) => {
  // PROFILE STORE
  const [profile, setProfile] = useState<Tables<"profiles"> | null>(null)
  const [destinations, setDestinations] = useState<Destination[] | null>([])
  const [searchInput, setSearchInput] = useState<string>("")
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const [trip, setTrip] = useState<Trip | null>(null)
  useEffect(() => {
    ;(async () => {
      const profile = await fetchStartingData()
    })()
  }, [])

  const fetchStartingData = async () => {
    const session = (await supabase.auth.getSession()).data.session

    if (session) {
      const user = session.user

      const profile = await getProfileByUserId(user.id)
      setProfile(profile)

      return profile
    }
  }

  return (
    <CruiseoContext.Provider
      value={{
        profile,
        setProfile,
        trip,
        setTrip,
        destinations,
        setDestinations,
        searchInput,
        setSearchInput,
        activeCategory,
        setActiveCategory
      }}
    >
      {children}
    </CruiseoContext.Provider>
  )
}
