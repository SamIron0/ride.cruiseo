import { supabase } from "@/lib/supabase/browser-client"
import type { Database, Tables, TablesInsert } from "@/supabase/types"

import { Destination, Trip } from "@/types"

//getDestinationById
export const retrieveTimes = async (destinations: Destination[]) => {
  const { data: times } = await supabase.from("destinations").select("")
  return times
}
