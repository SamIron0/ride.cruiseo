'use client'
import { useState } from "react"; import Link from "next/link";
import { cn } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/app/supabase-provider";
import { User } from "@supabase/supabase-js";

export default function GuestMenu() {
    const BODY_PADDING = "px-4 sm:px-6"
    const router = useRouter();
    const { supabase } = useSupabase();
    //setUserEmail(user.email || "")
    //setUserName("Welcome")


    return (
        <>
            <div className={cn(
                "top-0 sticky z-20 w-full py-3 px-12 bg-gray-100 flex flex-row flex-nowrap justify-between mx-auto h-14 items-stretch animate-in fade-in slide-in-from-top-4 duration-1000 ease-in-out",
                BODY_PADDING
            )}>
                <Link
                    className="text-black text-lg font-medium flex flex-row flex-nowrap items-center justify-center gap-x-1.5 pr-1.5 leading-none rounded-lg"
                    href="/"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="21"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-car-front">
                        <path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8" /><path d="M7 14h.01" /><path d="M17 14h.01" /><rect width="18" height="8" x="3" y="10" rx="2" /><path d="M5 18v2" /><path d="M19 18v2" /></svg>
                    <span text->mercury</span>
                </Link>

                <div className="flex flex-row flex-nowrap gap-x-1.5 items-center">
                    <div className="flex flex-row flex-nowrap gap-x-1.5 items-center">
                        <Link href="/signin"
                            className=" flex justify-center bg-black rounded-lg items-center">
                            <p className="text-white px-4 py-1 ">Log In</p>
                        </Link>
                    </div>


                </div>
            </div>
        </>
    )
}