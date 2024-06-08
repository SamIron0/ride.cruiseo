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
      <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 py-32 sm:max-w-md">
        <Link href="/" className="pb-4 text-3xl mx-auto font-semibold  ">
          Cruiseo
        </Link>

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
