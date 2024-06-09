import {
  createRouteHandlerClient,
  createServerSupabaseClient
} from "@supabase/auth-helpers-nextjs"
import { NextApiHandler } from "next"
import { saveTrip } from "@/db/admin"
import { cookies } from "next/headers"
import { Database, TablesInsert } from "@/supabase/types"
import { calculatePrice } from "@/utils/helpers"

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      const { origin, destination, trip } = await req.json()

      console.log("origin", origin)
      console.log("destination", destination)
      const { res } = await calculatePrice(origin, destination, trip)

      return new Response(JSON.stringify(res), {
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
