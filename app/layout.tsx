import getListings from '@/db/listings';
import SupabaseProvider from './supabase-provider';
import Footer from '@/components/ui/Footer';
import { PropsWithChildren } from 'react';
import 'styles/main.css';
import { ListingsProvider } from './providers/ListingProvider';
import ToasterProvider from './providers/ToasterProvider';
import ClientOnly from '@/components/ClientOnly';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { Database } from '@/types_db';
let  favicon = '/favicon.svg';
const meta = {
  title: 'Cruiseo Ride Share',
  description: 'Share a ride!',
  robots: 'follow, index',
  favicon: favicon,
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
    description: meta.description,
    type: meta.type,
    site_name: meta.title
  },
  twitter: {
    card: 'summary_large_image',
    site: '@getcruiseo',
    title: meta.title,
    description: meta.description
  }
};
export default async function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children
}: PropsWithChildren) {
  const cookieStore = cookies()
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        }
      }
    }
  )
  const session = (await supabase.auth.getSession()).data.session

  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-LSKBCKW7SS"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-LSKBCKW7SS');
              `
          }}
        ></script>

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={favicon}
        />
        <link
          rel="icon"
          type="image/svg"
          sizes="32x32"
          href={favicon}
        />
        <link
          rel="icon"
          type="image/svg"
          sizes="16x16"
          href={favicon}
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.0/flowbite.min.css"
          rel="stylesheet"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <SupabaseProvider>
          <ListingsProvider>
            <ClientOnly>
              <ToasterProvider />
            </ClientOnly>
            <div className="bg-black flex flex-row justify-center">
              {children}
            </div>
            <SpeedInsights />
            <Analytics />
            <Footer />
          </ListingsProvider>
        </SupabaseProvider>
        <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.0/flowbite.min.js"></script>
      </body>
    </html>
  );
}
