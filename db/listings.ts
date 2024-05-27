import { createClient } from "@/lib/supabase/server"
import type { Database, Tables, TablesInsert } from "@/supabase/types"

import { Destination, Trip } from "@/types"
import { cookies } from "next/headers"

const supabase = createClient(cookies())

//getDestinationById
export const retrieveTimes = async (destinations: Destination[]) => {
  const { data: times } = await supabase.from("destinations").select("")
  return times
}
