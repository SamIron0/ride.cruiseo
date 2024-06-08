import Container from "@/components/Container"
import Logo from "@/components/navbar/Logo"
import UserMenu from "@/components/navbar/UserMenu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SubmitButton } from "@/components/ui/submit-button"
import { createClient } from "@/lib/supabase/server"
import { Database } from "@/supabase/types"
import { createServerClient } from "@supabase/ssr"
import { Metadata } from "next"
import { cookies, headers } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"
import { toast } from "sonner"

export const metadata: Metadata = {
  title: "Login"
}

export default async function Login({
  searchParams
}: {
  searchParams: { message: string }
}) {
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

  if (session) {
    return redirect(`/destinations`)
  }

  const signIn = async (formData: FormData) => {
    "use server"

    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      return redirect(`/login?message=${error.message}`)
    }
    return redirect(`/destinations`)
  }

  const signUp = async (formData: FormData) => {
    "use server"

    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // USE IF YOU WANT TO SEND EMAIL VERIFICATION, ALSO CHANGE TOML FILE
        // emailRedirectTo: `${origin}/auth/callback`
      }
    })

    if (error) {
      console.error(error)
      return redirect(`/login?message=${error.message}`)
    }

    return redirect("/login?message=Check email to verify account")
  }

  const handleResetPassword = async (formData: FormData) => {
    "use server"

    const origin = headers().get("origin")
    const email = formData.get("email") as string
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/auth/callback?next=/login/password`
    })

    if (error) {
      return redirect(`/login?message=${error.message}`)
    }

    return redirect("/login?message=Check email to reset password")
  }

  return (
    <>
      <div className="fixed w-full z-10 shadow-sm  shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
        <div className="py-4 sm:px-4 border-[#232325] border-b-[1px]">
          <Container>
            <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
              <Logo />
              <UserMenu />
            </div>
          </Container>
        </div>
      </div>
      <div className="flex w-full flex-1 flex-col items-center gap-5 px-8 pt-20 pb-28 sm:max-w-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90"
          zoomAndPan="magnify"
          viewBox="0 0 375 187.499995"
          preserveAspectRatio="xMidYMid meet"
          version="1.0"
        >
          <defs>
            <clipPath id="a8885dd918">
              <path
                d="M 2 11 L 373 11 L 373 176 L 2 176 Z M 2 11 "
                clip-rule="nonzero"
              />
            </clipPath>
            <clipPath id="e36f8049ba">
              <path
                d="M 187.5 -137.160156 L 418.109375 93.449219 L 187.5 324.058594 L -43.109375 93.449219 Z M 187.5 -137.160156 "
                clip-rule="nonzero"
              />
            </clipPath>
            <clipPath id="0a3ef6188b">
              <path
                d="M 187.5 -137.160156 L 418.109375 93.449219 L 187.5 324.058594 L -43.109375 93.449219 Z M 187.5 -137.160156 "
                clip-rule="nonzero"
              />
            </clipPath>
          </defs>
          <g clip-path="url(#a8885dd918)">
            <g clip-path="url(#e36f8049ba)">
              <g clip-path="url(#0a3ef6188b)">
                <path
                  fill="#ffffff"
                  d="M 290.40625 175.785156 L 208.097656 175.773438 C 162.644531 175.785156 125.785156 138.929688 125.800781 93.476562 C 125.785156 86.328125 127.007812 79.507812 128.699219 72.902344 L 166.949219 72.902344 C 168.773438 72.894531 170.421875 73.492188 172.113281 73.945312 C 168.914062 79.785156 166.949219 86.371094 166.949219 93.476562 C 166.941406 116.171875 185.417969 134.625 208.097656 134.625 L 290.394531 134.625 C 313.097656 134.625 331.558594 116.167969 331.550781 93.46875 C 331.554688 70.785156 313.097656 52.328125 290.402344 52.320312 L 261.117188 52.332031 C 253.871094 35.835938 242.316406 21.800781 228.039062 11.171875 L 290.402344 11.171875 C 335.859375 11.179688 372.703125 48.019531 372.710938 93.480469 C 372.703125 138.929688 335.855469 175.78125 290.40625 175.785156 Z M 113.929688 134.632812 L 84.636719 134.636719 C 61.953125 134.632812 43.488281 116.167969 43.480469 93.484375 C 43.488281 70.785156 61.945312 52.328125 84.644531 52.320312 L 166.949219 52.328125 C 189.652344 52.328125 208.101562 70.777344 208.097656 93.476562 C 208.097656 100.566406 206.128906 107.152344 202.953125 113 C 204.65625 113.453125 206.277344 114.050781 208.097656 114.050781 L 246.339844 114.058594 C 248.058594 107.449219 249.253906 100.628906 249.246094 93.476562 C 249.25 48.03125 212.394531 11.171875 166.941406 11.171875 L 84.644531 11.171875 C 39.183594 11.179688 2.339844 48.023438 2.332031 93.484375 C 2.339844 138.929688 39.191406 175.78125 84.636719 175.789062 L 147.011719 175.789062 C 132.71875 165.160156 121.175781 151.113281 113.929688 134.632812 Z M 113.929688 134.632812 "
                  fill-opacity="1"
                  fill-rule="nonzero"
                />
              </g>
            </g>
          </g>
        </svg>
        <form
          className="flex w-full flex-1 flex-col justify-center gap-2 text-foreground animate-in"
          action={signIn}
        >
          <Label className="text-md mt-4" htmlFor="email">
            Email
          </Label>
          <Input
            className="mb-3 rounded-md border bg-background  px-4 py-2 text-[16px]"
            name="email"
            placeholder="you@example.com"
            required
          />

          <Label className="text-md" htmlFor="password">
            Password
          </Label>
          <Input
            className="mb-6 rounded-md border bg-background px-4 py-2 text-[16px]"
            name="password"
            placeholder="••••••••"
          />

          <SubmitButton className="mb-2 rounded-md bg-blue-700 px-4 py-2 text-white">
            Login
          </SubmitButton>

          <SubmitButton
            formAction={signUp}
            className="mb-2 rounded-md border border-foreground/20 px-4 py-2"
          >
            Sign Up
          </SubmitButton>

          {searchParams?.message && (
            <p className="mt-4 bg-foreground/10 p-4 text-center text-foreground">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </>
  )
}
