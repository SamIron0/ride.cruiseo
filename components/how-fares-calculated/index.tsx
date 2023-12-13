"use client"
export function HowFaresCalculated() {
    return (
        <div className="lg:flex items-center  p-8 sm:p-12  w-full text-white bg-black">

            {/* First div */}
            <div className="lg:w-1/2 pr-4 lg:pr-8 sm:w-full">
                <h1 className=" text-white pb-6 pt-4 font-medium text-3xl">How Fares Are Calculated</h1>
                <div className="pl-3 max-w-3xl">
                    <div className="flex mt-1 sm:mt-0 pb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide pt-1.5 lucide-target"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
                        </svg>
                        <p className="pl-1"> Mercury calculates trip fares based on time and distance.</p>
                    </div>
                    <div className="flex pb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide pt-1.5 lucide-target"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
                        </svg>
                        <p className="pl-1">  You pay for only your seat, so you could be paying as low as 1/3 of a regular Uber ride if match with 2 other riders</p>
                    </div>
                    <div className="flex pb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide pt-1.5 lucide-target"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
                        </svg>
                        <p className="pl-1"> The maximum amount you will pay if not matched with other riders is only 90% of a regular Uber ride</p>
                    </div>
                </div>
            </div>
            <div className="lg:w-1/2  pt-8 pb-6 sm:pt-0 sm:w-full">
                <img src="/mapvector.png"
                    alt="mapvector"
                    className="h-full w-full">
                </img>
            </div>
        </div >
    )
}