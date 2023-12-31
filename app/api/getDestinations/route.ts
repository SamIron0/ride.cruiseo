import { createRouteHandlerClient, createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Trip, GeoCoordinate } from "@/types";
import { Database } from "@/types_db";
import { cookies } from "next/headers";
import { createTrip, deleteTrip } from "@/utils/supabase-admin";
import { retrieveDestinations } from "@/utils/supabase-admin";
import { filterDestinations } from "./controller"

export async function POST(req: Request) {
    const region = await req.json();
    console.log(region)
    if (req.method === 'POST') {
        try {
            const destinations = await retrieveDestinations(region ? region : "");
            let response;
            // filter destinations to only give contain destinations based on users location
            filterDestinations(region, destinations)
            if (destinations != undefined) {
                response = destinations;
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
