import Link from "next/link"
import { cn } from "@/utils/helpers";
import { Session } from '@supabase/supabase-js';
import { createServerSupabaseClient } from "@/app/supabase-server";
import UserMenu from "./UserMenu";
import GuestMenu from "./GuestMenu";

export default async function Navbar() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();


  return (
    <>
      {user ?
        <UserMenu user={user}/>
        :
        <GuestMenu/>
      }
    </>)
}