import SupabaseProvider from './supabase-provider';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
import { cn } from '@/utils/helpers';
import { PropsWithChildren } from 'react';
import 'styles/main.css';
import { Inter } from "next/font/google"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ["latin"] })
const meta = {
  title: 'Cruiseo Ride Share',
  description: 'Brought to you by Samuel.',
  robots: 'follow, index',
  favicon: '/favicon.ico',
  url: 'https://cruiseo.xyz',
  type: 'website'
};

export const metadata = {
  title: meta.title,
  description: meta.description,
  robots: meta.robots,
  favicon: meta.favicon,
  url: meta.url,
  type: meta.type,
  openGraph: {
    url: meta.url,
    title: meta.title,
    description: meta.description, type: meta.type,
    site_name: meta.title
  },
  twitter: {
    card: 'summary_large_image',
    site: '@getcruiseo',
    title: meta.title,
    description: meta.description,
  }
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children
}: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-LSKBCKW7SS"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){
            dataLayer.push(arguments)
          }
          gtag('js', new Date());

          gtag('config', 'G-LSKBCKW7SS');
        </script>

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.0/flowbite.min.css" rel="stylesheet" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={cn(inter.className, "antialiased bg-gray-100")}>
        <SupabaseProvider>
          {/* @ts-expect-error */}
          <Navbar />
          <main
            id="skip"
            className={cn("min-h-screen flex items-stretch flex-col pb-28 mx-auto")}
          >
            {children}
            <SpeedInsights />
            <Analytics />

          </main>
          <Footer />
        </SupabaseProvider>
        <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.0/flowbite.min.js"></script>
      </body>
    </html>
  );
}
