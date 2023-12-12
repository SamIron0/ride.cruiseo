import type { NextApiRequest, NextApiResponse } from 'next';
import { EmailTemplate } from '@/components/email-template';
//import { Resend } from 'resend';

//const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(req: Request,) {
  try {
    EmailTemplate({ firstName: 'John' });
  } catch (error) {
  }
};
