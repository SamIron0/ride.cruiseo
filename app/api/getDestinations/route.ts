import { Destination } from "@/types"
import { retrieveDestinations } from "@/db/listings"

export async function GET(req: Request) {
  if (req.method === "GET") {
    try {
      const destinations: Destination[] | null = await retrieveDestinations()
      if (destinations != null) {
        return new Response(JSON.stringify(destinations), {
          status: 200
        })
      }
    } catch (err: any) {
      return new Response(
        JSON.stringify({ error: { statusCode: 500, message: err.message } })
      )
    }
  } else {
    return new Response(JSON.stringify("Method Not Allowed"))
  }
}
