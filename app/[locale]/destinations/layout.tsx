"use client"
import { CruiseoContext } from "@/context/context"
import { Destination } from "@/types"
import { ReactNode, useContext, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/browser-client"
import { getProfileByUserId } from "@/db/profile"
interface RootLayoutProps {
  children: ReactNode
}
export default function RootLayout({ children }: RootLayoutProps) {
  return <> {children}</>
}
