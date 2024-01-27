import {
  createRouteHandlerClient,
  createServerSupabaseClient
} from '@supabase/auth-helpers-nextjs';
import { Trip, GeoCoordinate, Destination } from '@/types';
import {
  getDestinationById,
  retrieveDestinations
} from '@/utils/supabase-admin';

export async function POST(req: Request) {
  if (req.method === 'POST') {
    try {
      const destinationId = await req.json();
      const destination: Destination | null = await getDestinationById(
        destinationId
      );
      // filter destinations to only give contain destinations based on users location
      if (destination != null) {
        return new Response(JSON.stringify(destination), {
          status: 200
        });
      }
    } catch (err: any) {
      return new Response(
        JSON.stringify({ error: { statusCode: 500, message: err.message } })
      );
    }
  } else {
    return new Response(JSON.stringify('Method Not Allowed'));
  }
}
