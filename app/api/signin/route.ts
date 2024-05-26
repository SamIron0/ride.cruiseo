import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  if (req.method === 'POST') {
    try {
      const formData = await req.json();
      const cookieStore = cookies();
      console.log('d',formData);
      const supabase = createClient(cookieStore);
      let email = formData.email;
      let password = formData.password;
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return new Response(
          JSON.stringify({ error: { statusCode: 500, message: error.message } })
        );
      }
      return new Response(
        JSON.stringify({ message: 'Signed in successfully' }),
        {
          status: 200
        }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ error: { statusCode: 500, message: error } })
      );
    }
  }
}
