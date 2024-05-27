import { Destination } from "@/types"
import { getDestinationById } from "@/db/admin"

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      const body = await req.json()

      // Extract the id from the request body
      const { id } = body
      const destination: Destination | null = await getDestinationById(id)
      if (destination != null) {
        return new Response(JSON.stringify(destination), {
          status: 200
        })
      } else {
        return new Response(JSON.stringify("Destination Not Found"), {
          status: 200
        })
      }
    } catch (err: any) {
      return new Response(
        JSON.stringify({ error: { statusCode: 500, message: err.message } })
      )
    }
  } else {
    return new Response(
      JSON.stringify({
        error: { statusCode: 405, message: "Method Not Allowed" }
      }),
      { status: 405 }
    )
  }
}
