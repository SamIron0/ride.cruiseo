import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@/lib/supabase/server';
    import { cookies } from 'next/headers';

export default async function signIn(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;
  const cookieStore = cookies();

  const supabase = createClient( cookieStore);

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json({ message: 'Signed in successfully' });
}
