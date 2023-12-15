"use client"


interface HowCruiseoWorksProps {
    setFocus: () => void;
}

export const HowCruiseoWorks: React.FC = () =>
    <div className="p-8 sm:p-12 w-full pb-16">
        <h1 className="pt-48 font-medium text-black text-3xl mb-12">How Cruiseo Works</h1>

        <ol className="relative  border-s max-w-3xl border-black ">
            <li className="mb-8 ms-4 ">
                <div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 bg-black"></div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-black">Request</h3>
                <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-500">Enter your pickup and destination locations along with the approximate pickup time.</p>

            </li>
            <li className="mb-8 ms-4">
                <div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 bg-black"></div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-black">Match</h3>
                <p className="text-base font-normal text-gray-500 dark:text-gray-500">We match you with other riders who share similar routes. The more riders you match with, the more affordable the trip becomes. Maximum of 3 riders per trip.</p>
            </li>
            <li className="mb-8 ms-4">
                <div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 bg-black"></div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-black">Pay</h3>
                <p className="text-base font-normal text-gray-500 dark:text-gray-500">You will receive a payment link, and your trip will be confirmed upon completing the payment. Any remaining balance will be refunded as more riders join your trip.</p>
            </li>
            <li className="ms-4 mb-8">
                <div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 bg-black"></div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-black">Ride</h3>
                <p className="text-base font-normal text-gray-500 dark:text-gray-500">Experience a comfortable ride in one of our vehicles.
                </p>
            </li>
            <li className="ms-4">
                <div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 bg-black"></div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-black">Hop Out</h3>
                <p className="text-base pb-2 font-normal text-gray-500 dark:text-gray-500">Arrive at your destination.
                </p>
            </li>
        </ol>
    </div>
