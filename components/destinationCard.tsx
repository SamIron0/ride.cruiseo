import { Destination, Trip } from "@/types";
import { useEffect, useState } from "react";
import { Users } from 'lucide-react';
interface DestinationCardProps {
  destination: Destination
}
export function DestinationCard({ destination }: DestinationCardProps) {
  const result: string[] = [];

  function address(originalAddress: string) {
    const match = originalAddress.match(/^(\d+) (.+), (.+), (.+) (\S+)$/);

    if (match) {
      const [, streetNumber, streetName] = match;
      return `${streetNumber} ${streetName}`;
    } else {
      console.error("Invalid address format");
      return null;
    }
  }


  function times(dates: string[] | undefined | null) {
    dates?.map((date) => {
      const originalDate = new Date(date);
      // Format the time in 12-hour format with lowercase am/pm
      const formattedTime = originalDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        .toLowerCase();
      result.push(formattedTime + ',')

    })

    return result // Output: "22:00"
  }

  function renderRiders(trips: Trip[] | null | undefined) {
    if (trips && trips != undefined) {
      const numberOfTrips = trips.length;

      if (numberOfTrips === 1) {
        console.log(trips[0])
        console.log("trips: " + trips)
        const numberOfRiders = trips[0]?.user_ids?.length;

        return (
          <div>
            {`${numberOfRiders}`}
          </div>
        );
      } else if (numberOfTrips > 1) {
        const minRiders = Math.min(...trips.map((trip) => trip?.user_ids?.length));
        const maxRiders = Math.max(...trips.map((trip) => trip?.user_ids?.length));

        if (minRiders === maxRiders) {

          return (
            <div>
              {`${minRiders}`}
            </div>
          );
        } else {
          return (
            <div>
              {`${minRiders}-${maxRiders}`}
            </div>
          );
        }
      }

      return <>0</>; // Handle the case when the trips array is empty

    }
    return
  }

  const [price, setPrice] = useState();
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch('/api/getPrice');
        if (res.status === 200) { // valid response
          const data = await res.json();
          setPrice(data.price.journey.fares[0].price_in_CAD);
          // console.log(data.price.journey.fares[0].price_in_CAD);
        } else {
          console.error("An error occurred while fetching the location");
        }
      } catch (error) {
        console.error("An error occurred while fetching the location:", error);
      }
    };
    //fetchPrice();
  }, [])


  return (
    <>
      <div className="relative flex flex-col mt-6 text-gray-700 ">
        <div
          className="relative -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl shadow-blue-gray-500/40">
          <img
            src={destination.photo}
            alt="card-image"
            className="" />
        </div>
        <div className="pt-3">
          <div className="flex  items-center justify-between">
            <h5 className="block font-sans text-md antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              {destination.name}
            </h5>
            <div className="flex p-1 items-center space-x-2">
              <Users className="w-4 h-4" />
              <div>
                {renderRiders(destination.activeTrips)}
              </div>

            </div>
          </div>
          <p className="block text-sm font-sans antialiased font-light leading-relaxed text-inherit">
            {address(destination.address)}
          </p>
          <p className="block text-sm font-sans antialiased font-light leading-relaxed text-inherit">
            Arrives: {times(destination.times)}
          </p>
          <p className="block text-md font-sans antialiased font-semi-bold leading-relaxed text-inherit">
            {price}
          </p>
        </div>
      </div></>
  )
}
