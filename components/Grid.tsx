"use client"
import Container from "./Container"
import ListingCard from "./listings/ListingCard"
import ClientOnly from "./ClientOnly"
import { useContext, useEffect } from "react"
import { CruiseoContext } from "@/context/context"
import { getProfileByUserId } from "@/db/profile"
import { supabase } from "@/lib/supabase/browser-client"

function editDistance(a: string, b: string): number {
  const m = a.length
  const n = b.length
  const d = new Array(m + 1)

  for (let i = 0; i <= m; i++) {
    d[i] = new Array(n + 1)
    d[i][0] = i
  }

  for (let j = 0; j <= n; j++) {
    d[0][j] = j
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      d[i][j] = Math.min(
        d[i - 1][j] + 1, // deletion
        d[i][j - 1] + 1, // insertion
        d[i - 1][j - 1] + cost // substitution
      )
    }
  }

  return d[m][n]
}
interface GridProps {}
export function Grid() {
  const {
    destinations,
    setDestinations,
    setProfile,
    searchInput,
    activeCategory
  } = useContext(CruiseoContext)

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
        setDestinations(await response.json())
        const profile = userID.data.user
          ? await getProfileByUserId(userID.data.user?.id as string)
          : null
        setProfile(profile)
      } catch (err) {
        console.error(err)
      }
    }

    fetchDestinations()
  }, [])

  const filteredListings =
    activeCategory === "All"
      ? destinations?.filter(listing =>
          listing.name.toLowerCase().includes(searchInput.toLowerCase())
        )
      : destinations?.filter(
          listing =>
            listing.category === activeCategory &&
            listing.name.toLowerCase().includes(searchInput.toLowerCase())
        )

  const sortedListings = filteredListings?.sort((a, b) => {
    const aScore = editDistance(a.name.toLowerCase(), searchInput.toLowerCase())
    const bScore = editDistance(b.name.toLowerCase(), searchInput.toLowerCase())
    return aScore - bScore
  })

  return (
    <ClientOnly>
      <Container>
        {destinations && (
          <div
            className="
              py-[198px]
              grid 
              grid-cols-1 
              sm:grid-cols-2 
              md:grid-cols-3 
              lg:grid-cols-4
              xl:grid-cols-5
              2xl:grid-cols-6
              gap-7
            "
          >
            {sortedListings?.map(listing => (
              <ListingCard key={listing.id} data={listing} />
            ))}
          </div>
        )}
      </Container>
    </ClientOnly>
  )
}
