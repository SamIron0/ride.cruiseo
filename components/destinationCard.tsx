import { Destination, Trip } from "@/types";
import { useEffect, useState } from "react";
import { Users } from "lucide-react";

interface DestinationCardProps {
  destination: Destination;
  price: string;
}
export function DestinationCard({ destination, price }: DestinationCardProps) {
  const result: string[] = [];
 // console.log("price:", price);
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

  function renderRiders(trips: Trip[] | null | undefined) {
    if (trips && trips != undefined) {
      const numberOfTrips = trips.length;

      if (numberOfTrips === 1) {
        const numberOfRiders = trips[0]?.user_ids?.length;

        return <div>{`${numberOfRiders}`}</div>;
      } else if (numberOfTrips > 1) {
        const minRiders = Math.min(
          ...trips.map((trip) => trip?.user_ids?.length)
        );
        const maxRiders = Math.max(
          ...trips.map((trip) => trip?.user_ids?.length)
        );

        if (minRiders === maxRiders) {
          return <div>{`${minRiders}`}</div>;
        } else {
          return <div>{`${minRiders}-${maxRiders}`}</div>;
        }
      }

      return <>0</>; // Handle the case when the trips array is empty
    }
    return;
  }

  return (
    <>
     
    </>
  );
}
