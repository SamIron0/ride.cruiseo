"use client"

import Link from "next/link"

export function WhyChooseMercury() {
    return (
        <div className="sm:p-12 p-6">
            <h1 className="pt-6 text-black  font-medium text-3xl">Why Go With Mercury</h1>
            <div className="animate-in fade-in mt-8 slide-in-from-bottom-4 duration-1200 w-full ease-in-out">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 justify-items-stretch w-full">
                    <div className=" text-black p-2 ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-dollar-sign"><circle cx="12" cy="12" r="10" /><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" /><path d="M12 18V6" /></svg>
                        <h2 className="text-xl pt-2 font-medium text-black">Save money</h2>
                        <p className="my-2 text-md text-gray-500">With Mercury, enjoy savings of up to 60% when matched with other riders.</p>
                    </div>
                    <div className=" text-black p-2   ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-clock-3"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16.5 12" /></svg>
                        <h2 className="text-xl pt-2 font-medium text-black">Skip the Wait</h2>

                        <p className="my-2 text-md text-gray-500">Dislike waiting out in the cold? So do we.</p>
                    </div>
                    <div className=" text-black p-2  ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-map-pinned"><path d="M18 8c0 4.5-6 9-6 9s-6-4.5-6-9a6 6 0 0 1 12 0" /><circle cx="12" cy="8" r="2" /><path d="M8.835 14H5a1 1 0 0 0-.9.7l-2 6c-.1.1-.1.2-.1.3 0 .6.4 1 1 1h18c.6 0 1-.4 1-1 0-.1 0-.2-.1-.3l-2-6a1 1 0 0 0-.9-.7h-3.835" /></svg>
                        <h2 className="text-xl pt-2 font-medium text-black">Exact destination dropoff</h2>
                        <p className="my-2 text-md text-gray-500">Say goodbye to long walks from the bus stop to your destination.</p>
                    </div>

                </div>
            </div>
            <Link href="/signin" className="inline-flex mt-8 items-center px-8 py-2 text-sm font-medium  border rounded-lg  bg-fuchsia-600 text-white border-fuchsia-400 hover:text-white hover:bg-fuchsia-500">
                Try it Out
                 <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
            </Link>
        </div>
    )
}