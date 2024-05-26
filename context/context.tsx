import { Tables } from "@/supabase/types"
import { Destination } from "@/types"
import { Dispatch, SetStateAction, createContext } from "react"
interface CruiseoContext {
  allListings: Destination[]
  setAllListings: Dispatch<SetStateAction<Destination[]>>
  searchInput: string
  setSearchInput: Dispatch<SetStateAction<string>>
  activeCategory: string
  setActiveCategory: Dispatch<SetStateAction<string>>
  profile: Tables<"profiles"> | null
  setProfile: Dispatch<SetStateAction<Tables<"profiles"> | null>>
}

export const CruiseoContext = createContext<CruiseoContext>({
  allListings: [],
  setAllListings: () => {},
  searchInput: "",
  setSearchInput: () => {},
  activeCategory: "",
  setActiveCategory: () => {},
   profile: null,
  setProfile: () => {}
})
