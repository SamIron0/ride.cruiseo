'use client'
import { useState } from "react"; 
import Link from "next/link";
import { cn } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/app/supabase-provider";
import { User } from "@supabase/supabase-js";

interface Prop {
    user: User
}


export default function UserMenu({ user }: Prop) {
    const [isOpen, setIsOpen] = useState(false);
    const BODY_PADDING = "px-4 sm:px-6"
    // const [userName, setUserName] = useState("")
    //   const [userEmail, setUserEmail] = useState("")
    const router = useRouter();
    const { supabase } = useSupabase();

    const userName = '';
    const userEmail = user?.email
    //setUserEmail(user.email || "")
    //setUserName("Welcome")
    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }
    const handleOpenMenu = (event: { preventDefault: () => void }) => {
        event.preventDefault()
        setIsOpen(!isOpen)
    }
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

                <div className="flex flex-row flex-nowrap gap-x-1.5 items-center">                    <button type="button" onClick={handleOpenMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-user">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                </button>

                </div>
                {isOpen ?
                    <div id="dropdownInformation" className="z-10 mt-14 sm:mr-8 mr-6 absolute top-0 right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                            <div>{userName}</div>
                            <div className="font-medium truncate">{userEmail}</div>
                        </div>
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                            </li>

                        </ul>
                        <div className="py-2">
                            <button onClick={handleSignOut} className="block px-4 w-full text-left py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</button>
                        </div>
                    </div>
                    : <></>
                }

            </div>


        </>
    )
}