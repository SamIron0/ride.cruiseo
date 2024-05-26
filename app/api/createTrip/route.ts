import {
  createRouteHandlerClient,
  createServerSupabaseClient
} from '@supabase/auth-helpers-nextjs';
import { NextApiHandler } from 'next';
import { createTrip } from '@/db/trips';
import { Trip } from '@/types';
import { Database } from '@/types_db';
import { cookies } from 'next/headers';
import { getSession } from '@/app/supabase-server';

export async function POST(req: Request) {
  if (req.method === 'POST') {
    try {
      const trip: Trip = await req.json();
      console.log('trip: ', trip);

      const supabase = createRouteHandlerClient<Database>({ cookies });
      const {
        data: { session }
      } = await supabase.auth.getSession();
      //const session2 = await getSession()

      if (!session) {
        return new Response(
          JSON.stringify({
            error: 'not authenticated',
            description:
              'The user does not have an active session or is not authenticated'
          }),
          { status: 500 }
        );
      }

      const tripID = await createTrip({
        trip: trip,
        userIds: [session.user.id]
      });
      if (tripID != undefined) {
        const response = 'Trip saved';
        return new Response(JSON.stringify(response), {
          status: 200
        });
      }

      return new Response(JSON.stringify('Trip Completed'), {
        status: 200
      });
    } catch (err: any) {
      return new Response(
        JSON.stringify({ error: { statusCode: 500, message: err.message } })
      );
    }
  } else {
    return new Response(JSON.stringify('Method Not Allowed'));
  }
}
