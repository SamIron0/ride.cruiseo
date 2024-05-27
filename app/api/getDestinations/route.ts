import {  Destination } from "@/types";
import { retrieveDestinations } from "@/db/listings";

export async function GET(req: Request) {
    if (req.method === 'GET') {
        try {
            const destinations: Destination[] | null = await retrieveDestinations();
            let response;
            // filter destinations to only give contain destinations based on users location
            if (destinations != null) {
                // change this to order by distance
                //response = await filterDestinations(region, destinations)
                return new Response(JSON.stringify(destinations), {
                    status: 200
                });
            }

        } catch (err: any) {
            return new Response(JSON.stringify({ error: { statusCode: 500, message: err.message } }));
        }
    } else {
        return new Response(JSON.stringify('Method Not Allowed'));

    }
}
