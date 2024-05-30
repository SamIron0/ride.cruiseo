import {
  createRouteHandlerClient,
  createServerSupabaseClient
} from "@supabase/auth-helpers-nextjs"
import { NextApiHandler } from "next"
import { createTrip } from "@/db/admin"
import { Database } from "@/types_db"
import { cookies } from "next/headers"
import { TablesInsert } from "@/supabase/types"

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      const trip: TablesInsert<"usertrips"> = await req.json()

      const supabase = createRouteHandlerClient<Database>({ cookies })
      const {
        data: { session }
      } = await supabase.auth.getSession()

      if (!session) {
        return new Response(
          JSON.stringify({
            error: "not authenticated",
            description:
              "The user does not have an active session or is not authenticated"
          }),
          { status: 500 }
        )
      }

      const tripID = await createTrip({
        trip: trip
      })
      if (tripID) {
        const response = "Trip saved"
        return new Response(JSON.stringify(response), {
          status: 200
        })
      }

      return new Response(JSON.stringify("Trip Not Saved"), {
        status: 200
      })
    } catch (err: any) {
      return new Response(
        JSON.stringify({ error: { statusCode: 500, message: err.message } })
      )
    }
  } else {
    return new Response(JSON.stringify("Method Not Allowed"))
  }
}
