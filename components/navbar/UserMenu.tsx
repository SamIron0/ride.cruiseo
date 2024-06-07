"use client"

import { CruiseoContext } from "@/context/context"
import MenuItem from "./MenuItem"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useCallback, useContext, useEffect, useState } from "react"
import { AiOutlineMenu } from "react-icons/ai"
import { TbUserFilled } from "react-icons/tb"
import { toast } from "sonner"

interface UserMenuProps {}

export default function UserMenu() {
  const supabase = createClient()
  const router = useRouter()
  const { profile } = useContext(CruiseoContext)
  // get session from api
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        toast.error(error.message)
      } else {
        router.push("/")
        toast.success("Signed Out")
      }
    } catch (error) {
      toast.error("An error occurred during signout.")
    }
  }

  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    setIsOpen(value => !value)
  }, [])

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => ({})}
          className="
            hidden
            md:block
            text-sm 
            font-medium
            py-3 
            px-4 
            rounded-full 
            hover:bg-[#232325]

            transition 
            cursor-pointer
          "
        >
          How it works
        </div>
        <div
          onClick={toggleOpen}
          className="
          p-4
          md:py-3
          md:px-4
          border-[1px] 
          border-[#232325]
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <TbUserFilled />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
          border
          border-input
          bg-background
          text-white
            absolute 
            rounded-xl 
            shadow-md
            w-[200px]
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {profile ? (
              <>
                <MenuItem
                  label="My Account"
                  onClick={() => router.push("/dashboard")}
                />

                <MenuItem
                  label="Logout"
                  onClick={() => {
                    signOut()
                    toggleOpen()
                  }}
                />
              </>
            ) : (
              <>
                <MenuItem
                  label="Login"
                  onClick={() => {
                    router.push("/login")
                    toggleOpen()
                  }}
                />
                <MenuItem
                  label="Sign up"
                  onClick={() => {
                    router.push("/login")
                    toggleOpen()
                  }}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
