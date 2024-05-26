"use client"

import Navbar from "@/components/navbar/NavBar"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function ChatPage() {
  redirect("/destinations")
  return <></>
}
