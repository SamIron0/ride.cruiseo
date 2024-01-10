import { getAddressJson } from "./controller";
import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      const { originraw, destinationraw } = await req.json();
      const [origin, destination] = await getAddressJson(
        originraw,
        destinationraw
      );
      //let destinationJson = await getAddressJson(destination);
      // Make a POST request to the Ngrok link
      const ngrokLink =
        "https://500e-66-244-231-114.ngrok-free.app/execute-script";
      // console.log("destinationjson:", destination);
      const response = await fetch(ngrokLink, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ origin: origin, destination: destination }),
      });
      const jsonResponse: any = await response.json();

      console.log(
        "Ngrok  response for " + destination.name + "=" + jsonResponse.result
      );
      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        return new Response(JSON.stringify(jsonResponse.result), {
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
