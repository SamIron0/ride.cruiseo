"use client"


interface HowMercuryWorksProps {
    setFocus: () => void;
}

export const HowMercuryWorks: React.FC = () =>
    <div className="p-2">
        <h1 className="pt-48 font-medium text-black text-3xl mb-12">How Mercury Works</h1>

        <ol className="relative  border-s w-full border-gray-200 dark:border-gray-400">
            <li className="mb-8 ms-4">
                <div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 bg-gray-500"></div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-black">Request</h3>
                <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-500">Enter your pickup and destination locations and approximate time for pickup.</p>

            </li>
            <li className="mb-8 ms-4">
                <div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 bg-gray-500"></div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-black">Match</h3>
                <p className="text-base font-normal text-gray-500 dark:text-gray-500">We work on the backend to match you with other riders following similar routes.</p>
            </li>
            <li className="mb-8 ms-4">
                <div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 bg-gray-500"></div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-black">Pay</h3>
                <p className="text-base font-normal text-gray-500 dark:text-gray-500">You are sent a payment link and your trip in automatically confirmed once payment is complete. You will be refunded the balance as more riders join your trip.</p>
            </li>
            <li className="ms-4 mb-8">
                <div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 bg-gray-500"></div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-black">Ride</h3>
                <p className="text-base font-normal text-gray-500 dark:text-gray-500">Enjoy a comfortable ride in one of our vehicles.
                </p>
            </li>
            <li className="ms-4">
                <div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 bg-gray-500"></div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-black">Hop Out</h3>
                <p className="text-base pb-2 font-normal text-gray-500 dark:text-gray-500">Arrive at your destination.
                </p>
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium  border  rounded-lg  focus:z-10 focus:ring-4 focus:outline-none focus:text-blue-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700 focus:ring-gray-700">Try it Out <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg></button>
            </li>
        </ol>
    </div>
