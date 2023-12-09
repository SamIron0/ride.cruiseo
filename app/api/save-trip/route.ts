import { createRouteHandlerClient, createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiHandler } from "next";
import {
    createOrRetrieveCustomer,
    createOrRetrieveTrip
} from '@/utils/supabase-admin';
import { Trip } from "@/types";
import { Database } from "@/types_db";
import { cookies } from "next/headers";
import { getSession } from "@/app/supabase-server";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request,) {
    if (req.method === 'POST') {

        try {
            const trip: Trip = await req.json();
            console.log("retrieved trip: " + trip.destination);

            const supabase = createRouteHandlerClient<Database>({ cookies });
            const {
                data: { session }
            } = await supabase.auth.getSession();
            const session2 = await getSession()
            console.log("retrieved supabase: ");

            if (!session) {
                return new Response(JSON.stringify({
                    error: 'not authenticatedd',
                    description: 'The user does not have an active session or is not authenticated'
                }), { status: 500 });
            }
            //console.log("session checked: ")

            //const tripID = createOrRetrieveTrip(trip, session.user.id);
            const customer = await createOrRetrieveCustomer({
                uuid: uuidv4() || '',
                email: session.user.email || ''
              });

        console.log("id is "+ customer )

            // console.log("session2 is "+ session2?.user.email )
            /*
                        if (tripID != undefined) {
                            const response = "Trip saved";
                            return new Response(JSON.stringify(response), {
                                status: 200
                            });
                        }
            */
            return new Response(JSON.stringify({ yeah: "d" }), {
                status: 200
            });
        } catch (err: any) {
            //console.log(err);
            return new Response(JSON.stringify({ error: { statusCode: 500, message: err.message } }));
        }
    } else {
        return new Response(JSON.stringify('Method Not Allowed'));

    }
}