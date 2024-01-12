import { Destination, Trip } from "@/types";
import { getTrip } from "@/utils/supabase-admin";
import { useEffect, useState } from "react";

interface DestinationCardProps {
  destination: Destination;
  userLocation: any;
}
export function DestinationCard({
  destination,
  userLocation,
}: DestinationCardProps) {
  const result: string[] = [];
  const [price, setPrice] = useState();
  function address(address: string) {
    // Define a regular expression pattern to capture everything before the street name
    const pattern: RegExp = /(.+?)\s+\b\w{2}\b\s+\w{1}\d\w{1}\s*\d\w{1}\d\s*,?/;

    // Use the pattern to find the match in the input string
    const match: RegExpExecArray | null = pattern.exec(address);

    // Extract the portion before the street name and remove trailing comma if present
    const result: string = match ? match[1].replace(/,\s*$/, "") : address;

    return result;
  }

  const getPrice = async (workerID: number, userDestination: Destination) => {
    //console.log("user location: ", userLocation);
    //console.log("user destination: ", userDestination.address);
    destinationCoordinates = {
      lat: userDestination.coordinates.lat,
      lng: userDestination.coordinates.lng,
    };
    while (userDestination.price == undefined) {
      try {
        console.log("destinationlongitude: ", userDestination.coordinates);
        const response = await fetch(
          "https://1ni3q9uo0h.execute-api.us-east-1.amazonaws.com/final",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              originraw: userLocation,
              destinationraw: userDestination.address,
              worker: workerID,
              destinationcoord: destinationCoordinates,
              // Add any other parameters your Lambda function expects
            }),
          }
        );

        if (response.ok) {
          const result = await response.json();
          //setPrice(result.body);
          userDestination.price = result.body;
          setPrice(result.body);
          //console.log("result:", result.body);
          // Process the result as needed
        } else {
          console.error("Error invoking Lambda function:", response.statusText);
        }
      } catch (error) {
        console.error(
          "An error occurred while invoking Lambda function:",
          error
        );
      }
    }
  };
  const runWorker = async (workerID: number, destination: Destination) => {
    await getPrice(workerID, destination);
  };

  const runWorkers = async () => {
    const allDestinations: any[] = destinations;
    const workers: number[] = [1, 2];

    const workerPromises = workers.map(async (workerID) => {
      while (allDestinations.length > 0) {
        const destination = allDestinations.pop();

        if (destination) {
          await runWorker(workerID, destination);
        }
      }
    });

    // Use Promise.all to run all workers simultaneously
    await Promise.all(workerPromises);
  };

  useEffect(() => {
    runWorkers();
  }, [destination]); // Empty dependency array to run the effect only once on mount

  function times(dates: string[] | undefined | null) {
    dates?.map((date) => {
      const originalDate = new Date(date);
      // Format the time in 12-hour format with lowercase am/pm
      const formattedTime = originalDate
        .toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })
        .toLowerCase();
      result.push(formattedTime + ",");
    });

    return result; // Output: "22:00"
  }

  return (
    <>
      <div className="relative flex flex-col mt-6 text-gray-700 ">
        <div className="relative -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl shadow-blue-gray-500/40">
          <img src={destination.photo} alt="card-image" className="" />
        </div>
        <div className="pt-3">
          <h5 className="block font-sans text-md antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            {destination.name}
          </h5>

          <p className="block text-sm font-sans antialiased font-light leading-relaxed text-inherit">
            {address(destination.address)}
          </p>
          <p className="block text-sm font-sans antialiased font-light leading-relaxed text-inherit">
            Arrives:{times(destination.times)}
          </p>
          <p className="block text-md font-sans antialiased font-semibold leading-relaxed text-inherit">
            {price}
          </p>
        </div>
      </div>
    </>
  );
}
