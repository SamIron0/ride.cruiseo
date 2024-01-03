import { createRouteHandlerClient, createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Trip, GeoCoordinate, Destination } from "@/types";
import { retrieveDestinations } from "@/utils/supabase-admin";
import { filterDestinations } from "./controller"

export async function POST(req: Request) {
    if (req.method === 'POST') {
        try {
            const region = await req.json();
            console.log(region)
            const destinations: Destination[] | null = await retrieveDestinations();
            let response;
            // filter destinations to only give contain destinations based on users location
            if (destinations != null) {
                response = await filterDestinations(region, destinations)
                return new Response(JSON.stringify(response), {
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
