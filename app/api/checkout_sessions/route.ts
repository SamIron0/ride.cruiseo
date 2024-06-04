import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10"
})

export async function POST(req: Request): Promise<Response> {
  try {
    const product = await stripe.products.create({
      name: "productName",
      description: "productDescription"
    })

    // Create a Price for the Product
    const price = await stripe.prices.create({
      unit_amount: 200.0,
      currency: "cad",
      product: product.id
    })

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          price: price.id,
          quantity: 1
        }
      ],
      mode: "payment",
      return_url: `https://cruiseo.xyz/dashboard?session_id={CHECKOUT_SESSION_ID}`
    })

    return new Response(
      JSON.stringify({ clientSecret: session.client_secret }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    )
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: err.statusCode || 500,
      headers: { "Content-Type": "application/json" }
    })
  }
}

export async function GET(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url)
  const sessionId = searchParams.get("session_id")
  console.log("sesh", sessionId)

  if (!sessionId) {
    return new Response(JSON.stringify({ error: "Session ID is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    await stripe.checkout.sessions.expire(sessionId)
    return new Response(
      JSON.stringify({
        status: session.status,
        customer_email: session.customer_details?.email
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    )
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: err.statusCode || 500,
      headers: { "Content-Type": "application/json" }
    })
  }
}

export async function DELETE(_req: Request): Promise<Response> {
  return new Response("Method Not Allowed", { status: 405 })
}
