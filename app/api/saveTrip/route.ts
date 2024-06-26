import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10"
})

import {
  createRouteHandlerClient,
  createServerSupabaseClient
} from "@supabase/auth-helpers-nextjs"
import { NextApiHandler } from "next"
import { hasSessionIdBeenUsed, saveTrip } from "@/db/admin"
import { cookies } from "next/headers"
import { Database, TablesInsert } from "@/supabase/types"

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      //const { searchParams } = new URL(req.url)
      //const sessionId = searchParams.get("session_id")

      const body = await req.json()

      const { trip, sessionId } = body
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
      // console.log("Session ID:", sessionId)
      const hasSessionBeenUsed = await hasSessionIdBeenUsed(sessionId)

      if (hasSessionBeenUsed) {
        return new Response(
          JSON.stringify({ error: "Session ID has been used" }),
          { status: 400 }
        )
      }
      const tripID = await saveTrip(JSON.parse(trip), sessionId)
      const response = "Trip saved"
      return new Response(JSON.stringify(response), {
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
