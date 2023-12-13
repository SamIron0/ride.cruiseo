"use client"
export function HowFaresCalculated() {
    return (
        <div className="lg:flex p-12 items-center w-full text-white bg-black">

            {/* First div */}
            <div className="lg:w-1/2 sm:w-full">
                <h1 className=" text-white font-medium text-3xl">How Fares Are Calculated</h1>
                <ul>
                    <li>First bullet point</li>
                    <li>Second bullet point</li>
                    <li>Third bullet point</li>
                </ul>
            </div>
            <div className="lg:w-1/2 sm:w-full">
                <img src="/mapvector.png"
                    alt="mapvector"
                    className="h-full w-full">
                </img>
            </div>
        </div >
    )
}