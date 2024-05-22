import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@/lib/supabase/server';

export default async function signUp(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json({ message: 'Signed up successfully' });
}
