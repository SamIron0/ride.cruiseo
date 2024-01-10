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

  const [price, setPrice] = useState("0"); // Initialize state for price
  useEffect(() => {
    const getPrice = async () => {
      try {
        const url = "/api/get-price";
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            originraw: userLocation,
            destinationraw: destination.address,
          }),
        };

        const response = await fetch(url, options);

        if (response.ok) {
          const data = await response.json();
          //console.log("Price:", data);
          setPrice(data); // Update state with data;
        } else {
          // Handle non-OK response
          console.error("Error:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("An error occurred while fetching price:", error);
      }
    };
    if(
      destination.category == 'Shop'
    ){
      getPrice();
    }
  }, []);

  function address(address: string) {
    // Define a regular expression pattern to capture everything before the street name
    const pattern: RegExp = /(.+?)\s+\b\w{2}\b\s+\w{1}\d\w{1}\s*\d\w{1}\d\s*,?/;

    // Use the pattern to find the match in the input string
    const match: RegExpExecArray | null = pattern.exec(address);

    // Extract the portion before the street name and remove trailing comma if present
    const result: string = match ? match[1].replace(/,\s*$/, "") : address;

    return result;
  }

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
          <p className="block text-md font-sans antialiased font-semi-bold leading-relaxed text-inherit">
            {destination.category == "Shop" ? price : <></>}
          </p>
        </div>
      </div>
    </>
  );
}
