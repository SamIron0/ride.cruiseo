import { createRouteHandlerClient, createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Trip } from "@/types";
import { Database } from "@/types_db";
import { cookies } from "next/headers";
import { createTrip, deleteTrip } from "@/utils/supabase-admin";
import { retrieveDestinations } from "@/app/supabase-server";
export async function POST(req: Request,) {
    if (req.method === 'POST') {

        try {
            const location = await req.json();

            const supabase = createRouteHandlerClient<Database>({ cookies });
            const destinations = await retrieveDestinations(location);
            let response;
            if (destinations != undefined) {
                response = destinations;
                return new Response(JSON.stringify(response), {
                    status: 200
                });
            }
            return new Response(JSON.stringify(response), {
                status: 200
            });
        } catch (err: any) {
            return new Response(JSON.stringify({ error: { statusCode: 500, message: err.message } }));
        }
    } else {
        return new Response(JSON.stringify('Method Not Allowed'));

    }
}
