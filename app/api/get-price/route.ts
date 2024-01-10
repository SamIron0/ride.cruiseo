import { getAddressJson } from "./controller";
import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      const { origin, destination } = await req.json();
      const [originJson, destinationJson] = await getAddressJson(
        origin,
        destination
      );
      //let destinationJson = await getAddressJson(destination);
      // Make a POST request to the Ngrok link
      const ngrokLink =
        "https://500e-66-244-231-114.ngrok-free.app/execute-script";
      console.log("originJson:", originJson);
      const response = await fetch(ngrokLink, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originJson, destinationJson }),
      });
      console.log("Ngrok response:", response);
      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        const result = await response.json();
        return new Response(JSON.stringify(response), {
          status: 200,
        });
      } else {
        return new Response(JSON.stringify({ error: { statusCode: 500 } }));
      }
    } catch (err: any) {
      return new Response(
        JSON.stringify({ error: { statusCode: 500, message: err.message } })
      );
    }
  } else {
    return new Response(
      JSON.stringify({
        error: { statusCode: 405, message: "Method Not Allowed" },
      })
    );
  }
}
