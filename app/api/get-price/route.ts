import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import { getAddressJson } from "./controller";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { origin, destination } = await req.body;
      const [originJson, destinationJson] = await getAddressJson(
        origin,
        destination
      );
      console.log("Received origin in api:", origin);
      console.log("Received destination in api:", destination);
      //let destinationJson = await getAddressJson(destination);
      // Make a POST request to the Ngrok link
      const ngrokLink =
        "https://500e-66-244-231-114.ngrok-free.app/execute-script";
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
        return res.status(200).json(result);
      } else {
        // Handle other HTTP status codes
        const error = await response.json();
        return res.status(response.status).json(error);
      }
    } catch (err) {
      return res
        .status(500)
        .json({ error: { statusCode: 500, message: err.message } });
    }
  } else {
    return res
      .status(405)
      .json({ error: { statusCode: 405, message: "Method Not Allowed" } });
  }
}
