import { Resend } from "resend"
const resend = new Resend(process.env.RESEND_API_KEY)
export async function POST(req: Request) {
  if (req.method === "POST") {
    try {

      const body = await req.json()

      // Extract the id from the request body
      const { email, message,subject } = body

      await resend.emails.send({
        from: "ironkwe.site <website@cruiseo.xyz>",
        to: email,
        subject: `via ironkwe.site`,
        html: `<div>${message}</div>` // Use html instead of react
      })

      return new Response(JSON.stringify("Email sent"), {
        status: 200
      })
    } catch (e) {
      return new Response(JSON.stringify("Email not sent"), {
        status: 500 // Use a 500 status code for errors
      })
    }
  }
}
