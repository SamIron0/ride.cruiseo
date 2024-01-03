'use client'
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";

export default function GuestMenu() {
    const BODY_PADDING = "px-4 sm:px-12"
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const closeMenuOnOutsideClick = (event: { target: any; }) => {
        if (isOpen && menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', closeMenuOnOutsideClick);

        return () => {
            document.removeEventListener('click', closeMenuOnOutsideClick);
        };
    }, [isOpen]);
    const menuRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <div className={cn(
                "top-0 sticky z-20 w-full bg-gray-100 flex flex-row flex-nowrap justify-between mx-auto h-14 items-stretch animate-in fade-in slide-in-from-top-4 duration-1000 ease-in-out px-6 sm:px-12"
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
                    <span text->cruiseo</span>
                </Link>

                <div className="flex flex-row flex-nowrap gap-x-1.5 items-center">
                    <a href="/pricing" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-fuchsia-700 md:p-0">Pricing</a>

                    <div className="flex flex-row flex-nowrap gap-x-1.5 items-center">
                        <Link href="/signin"
                            className=" flex justify-center bg-black rounded-lg items-center">
                            <p className="text-white px-4 py-1 ">Log In</p>
                        </Link>
                    </div>
                    <>
                        <div className="flex flex-col justify-center min-h-screen py-6 sm:py-12">
                            <div className="relative py-3 mx-auto sm:max-w-xl">
                                <nav>
                                    <button
                                        className="relative w-10 h-10 text-gray-500 rounded-sm focus:outline-none"
                                        onClick={() => setIsOpen(!isOpen)}>
                                        <span className="sr-only">Open main menu</span>
                                        <div className="absolute block w-5 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                                            <span
                                                aria-hidden="true"
                                                className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${isOpen ? "rotate-45" : "-translate-y-1.5"
                                                    }`}></span>
                                            <span
                                                aria-hidden="true"
                                                className={`block absolute  h-0.5 w-5 bg-current   transform transition duration-500 ease-in-out ${isOpen && "opacity-0"
                                                    }`}></span>
                                            <span
                                                aria-hidden="true"
                                                className={`block absolute  h-0.5 w-5 bg-current transform  transition duration-500 ease-in-out ${isOpen ? "-rotate-45" : "translate-y-1.5"
                                                    }`}></span>
                                        </div>
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </>

                </div>

                {isOpen ?
                    <div ref={menuRef} id="dropdownInformation" className="z-10 mt-14 sm:mr-8 mr-6 absolute top-0 right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                            <div className="font-medium truncate">Welcome</div>
                        </div>
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
                            <li>
                                <a href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Home</a>
                            </li>

                        </ul>
                        <div className="py-2">
                            <a href="/contactus" className="block px-4 w-full text-left py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Contact Us</a>
                        </div>
                    </div>
                    : <></>
                }
            </div>
        </>
    )
}