"use client"


interface HowMercuryWorksProps {
    setFocus: () => void;
}

export const HowMercuryWorks: React.FC = () =>
    <div className="p-2">
        <h1 className="pt-48 font-medium text-black text-3xl mb-12">How Mercury Works</h1>

        <ol className="relative  border-s w-full border-gray-400 ">
            <li className="mb-8 ms-4 ">
                <div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 bg-gray-400"></div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-black">Request</h3>
                <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-500">Enter your pickup and destination locations and approximate time for pickup.</p>

            </li>
            <li className="mb-8 ms-4">
                <div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 bg-gray-400"></div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-black">Match</h3>
                <p className="text-base font-normal text-gray-500 dark:text-gray-500">We work on the backend to match you with other riders following similar routes.</p>
            </li>
            <li className="mb-8 ms-4">
                <div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 bg-gray-400"></div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-black">Pay</h3>
                <p className="text-base font-normal text-gray-500 dark:text-gray-500">You are sent a payment link and your trip in automatically confirmed once payment is complete. You will be refunded the balance as more riders join your trip.</p>
            </li>
            <li className="ms-4 mb-8">
                <div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 bg-gray-400"></div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-black">Ride</h3>
                <p className="text-base font-normal text-gray-500 dark:text-gray-500">Enjoy a comfortable ride in one of our vehicles.
                </p>
            </li>
            <li className="ms-4">
                <div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 bg-gray-400"></div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-black">Hop Out</h3>
                <p className="text-base pb-2 font-normal text-gray-500 dark:text-gray-500">Arrive at your destination.
                </p>
            </li>
        </ol>
    </div>
