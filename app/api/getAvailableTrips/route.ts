import { Destination } from "@/types"
import { getAvailableTrips, getDestinationById } from "@/db/admin"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/supabase/types"
import { cookies } from "next/headers"

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      const body = await req.json()
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
      // Extract the id from the request body
      const { destination, dateTime } = body
      const trips = await getAvailableTrips(
        session.user.id,
        dateTime.date,
        destination
      )

      return new Response(JSON.stringify(trips), {
        status: 200
      })
    } catch (error) {
      console.error(error)
    }
  }
}
