"use client"
import { Grid } from "@/components/Grid"
import Navbar from "@/components/navbar/NavBar"
import { CruiseoContext } from "@/context/context"
import { useContext, useEffect } from "react"
import { supabase } from "@/lib/supabase/browser-client"
import { getProfileByUserId } from "@/db/profile"
import { useRouter } from "next/navigation"
export default function Home() {
  const router = useRouter()
  const { profile, setProfile } = useContext(CruiseoContext)
  useEffect(() => {
    ;(async () => {
      const session = (await supabase.auth.getSession()).data.session
      if (!session) {
        router.push("/login")
        return
      }
      const prof = await getProfileByUserId(session.user.id)
      setProfile(prof)

      if (!prof?.has_onboarded) {
        router.push("/setup")
      }
    })()
  }, [])
  return (
    <>
      <Navbar />

      <Grid></Grid>
    </>
  )
}
