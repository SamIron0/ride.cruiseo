import AdminNotificationTemplate from '@/components/adminNotificationTemplate';
import BookingConfirmationTemplate from '@/components/bookingConfirmationTemplate';
import { Resend } from 'resend';


export async function POST(req: Request) {
    if (req.method === "POST") {
        try {

            const [trip, resend] = await req.json();

            // notify admin about new booking
            const data = await resend.emails.send({
                from: 'Mercury@fitpalai.com',
                to: ['samuelironkwec@gmail.com'],
                subject: 'New Booking',
                react: AdminNotificationTemplate(trip),
            });

            //notify user of their booking
            await resend.emails.send({
                from: 'Mercury<onboarding@resend.dev>',
                to: [trip.email],
                subject: 'Booking Confirmation',
                react: BookingConfirmationTemplate(trip),
            });

            return new Response(JSON.stringify(data), {
                status: 200,
            });

        } catch (error) {
            return new Response(JSON.stringify(error), { status: 500 });
        }
    }
}
