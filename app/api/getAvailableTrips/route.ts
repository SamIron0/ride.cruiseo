import { Destination } from "@/types"
import { getAvailableTrips, getDestinationById } from "@/db/admin"

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      const body = await req.json()

      // Extract the id from the request body
      const { destinationId, dateTime } = body
      const trips = await getAvailableTrips(dateTime.date, destinationId)

      return new Response(JSON.stringify(trips), {
        status: 200
      })
    } catch (error) {
      console.error(error)
    }
  }
}
