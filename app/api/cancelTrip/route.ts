import {
  createRouteHandlerClient,
  createServerSupabaseClient
} from "@supabase/auth-helpers-nextjs"
import { Trip } from "@/types"
import { cookies } from "next/headers"
import { cancelTrip } from "@/db/admin"
import { Database } from "@/supabase/types"

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      const body = await req.json()

      // Extract the id from the request body
      const { trip_id } = body

      const supabase = createRouteHandlerClient<Database>({ cookies })
      const {
        data: { session }
      } = await supabase.auth.getSession()
      //const session2 = await getSession()

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
      const tripID = await cancelTrip(trip_id, session.user.id)
      if (tripID != undefined) {
        const response = "Trip deleted"
        return new Response(JSON.stringify(response), {
          status: 200
        })
      }
      return new Response(JSON.stringify("Trip Deleted"), {
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
