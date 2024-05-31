import { Destination } from "@/types"
import {
  getAvailableTrips,
  getDestinationById,
  getUsersTrips
} from "@/db/admin"

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      const body = await req.json()

      // Extract the id from the request body
      const { userID } = body
      const trips = await getUsersTrips(userID)

      return new Response(JSON.stringify(trips), {
        status: 200
      })
    } catch (error) {
      console.error(error)
    }
  }
}
