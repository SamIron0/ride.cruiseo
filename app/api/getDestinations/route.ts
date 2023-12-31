import { createRouteHandlerClient, createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Trip, GeoCoordinate } from "@/types";
import { Database } from "@/types_db";
import { cookies } from "next/headers";
import { createTrip, deleteTrip } from "@/utils/supabase-admin";
import { retrieveDestinations } from "@/utils/supabase-admin";
import { filterDestinations } from "./controller"

export async function POST(req: Request) {
    const location = await req.json();
    if (req.method === 'POST') {
        try {
            const destinations = await retrieveDestinations(location ? location : "");
            // filter destinations to only give contain destinations based on users location
            let response = filterDestinations(location, destinations);
            if (response != undefined) {
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
