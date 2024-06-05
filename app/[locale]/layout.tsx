import { Toaster } from "@/components/ui/sonner"
import { Providers } from "@/components/utility/providers"
import { Database } from "@/supabase/types"
import { createServerClient } from "@supabase/ssr"
import { Inter } from "next/font/google"
import { cookies } from "next/headers"
import { ReactNode } from "react"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"
import { GlobalState } from "@/components/utility/global-state"
import Footer from "@/components/ui/Footer"

const inter = Inter({ subsets: ["latin"] })
const APP_NAME = "Cruiseo"
const APP_DEFAULT_TITLE = "Cruiseo"
const APP_TITLE_TEMPLATE = "%s - Cruiseo"
const APP_DESCRIPTION = "Cruiseo"

interface RootLayoutProps {
  children: ReactNode
  params: {
    locale: string
  }
}
let favicon = "/favicon.svg"
const meta = {
  title: "Cruiseo Ride Share",
  description: "Share a ride!",
  robots: "follow, index",
  favicon: favicon,
  url: "https://cruiseo.xyz",
  type: "website"
}

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
    card: "summary_large_image",
    site: "@getcruiseo",
    title: meta.title,
    description: meta.description
  }
}
export default async function RootLayout({
  children,
  params: { locale }
}: RootLayoutProps) {
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
    <html lang="en" suppressHydrationWarning>
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
        <link rel="apple-touch-icon" sizes="180x180" href={favicon} />
        <link rel="icon" type="image/svg" sizes="32x32" href={favicon} />
        <link rel="icon" type="image/svg" sizes="16x16" href={favicon} />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.0/flowbite.min.css"
          rel="stylesheet"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <Providers attribute="class" defaultTheme="dark">
          <Toaster richColors position="top-center" duration={3000} />
          <div className="flex flex-col items-center overflow-x-auto bg-black text-foreground hide-scrollbar">
            <GlobalState>{children}</GlobalState> 
            <Footer />
          </div>
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
