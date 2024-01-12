"use client";
import Button from "@/components/ui/Button";
import { Database, Json } from "@/types_db";
import { postData } from "@/utils/helpers";
import { getStripe } from "@/utils/stripe-client";
import { Session, User } from "@supabase/supabase-js";
import cn from "classnames";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { CarpoolCount } from "./ui/carpool-count";
import { CarpoolForm } from "./ui/carpool-form";
import { HowCruiseoWorks } from "./how-cruiseo-works";
import { WhyChooseCruiseo } from "./why-choose-cruiseo";
import { CarpoolGrid } from "./ui/carpool-grid";
import { Trip, UserDetails, Destination } from "@/types";
import { HowFaresCalculated } from "./how-fares-calculated";
import { AllTripsGrid } from "./allTripsGrid";

type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"];
type Product = Database["public"]["Tables"]["products"]["Row"];
type Price = Database["public"]["Tables"]["prices"]["Row"];

interface Props {
  trips: Trip[] | null | undefined;
  user: User | null | undefined;
  userDetails: UserDetails | null;
}

export default function CruiseoHome({ trips, user, userDetails }: Props) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const [destinations, setAllDestinations] = useState<Destination[]>([]); // New state variable
  const [airportDestinations, setAirportDestinations] = useState<Destination[]>(
    []
  ); // New state variable
  const [shopDestinations, setShopDestinations] = useState<Destination[]>([]); // New state variable
  const [schoolDestinations, setSchoolDestinations] = useState<Destination[]>(
    []
  ); // New state variable
  const [cinemaDestinations, setCinemaDestinations] = useState<Destination[]>(
    []
  ); // New state variable

  function filterDestinations(
    destinations: Destination[],
    category: string
  ): Destination[] {
    const result: Destination[] = [];
    destinations.map((destination) => {
      if (destination.category == category) {
        result.push(destination);
      }
    });
    return result;
  }

  const [region, setRegion] = useState("");
  const [locationFetched, setLocationFetched] = useState(false); // New state variable

  const fetchLocation = async () => {
    try {
      const res = await fetch("/api/getLocation");
      if (res.status === 200) {
        // valid response
        const data = await res.json();
        setRegion(data.location);
        setLocationFetched(true); // Mark location as fetched
      } else {
        console.error("An error occurred while fetching the location");
      }
    } catch (error) {
      console.error("An error occurred while fetching the location:", error);
    }
  };

  const getPrice = async (workerID: number, userDestination: Destination) => {
    //console.log("user location: ", userLocation);
    //console.log("user destination: ", userDestination.address);
    while (userDestination.price == undefined) {
      try {
        console.log("destinationlongitude: ", userDestination.geocoordinate.lon);
        const response = await fetch(
          "https://1ni3q9uo0h.execute-api.us-east-1.amazonaws.com/final",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              originraw: region,
              destinationraw: userDestination.address,
              worker: workerID,
              // Add any other parameters your Lambda function expects
            }),
          }
        );

        if (response.ok) {
          const result = await response.json();
          //setPrice(result.body);
          userDestination.price = result.body;
          console.log("result:", result.body);
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
  }, [shopDestinations]); // Empty dependency array to run the effect only once on mount

  const fetchDestinations = async () => {
    try {
      const url = "/api/getDestinations";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(region),
      };
      const response = await fetch(url, options);
      const data = await response.json();
      if (data) {
        setAllDestinations(data);
        setCinemaDestinations(filterDestinations(data, "Cinema"));
        setAirportDestinations(filterDestinations(data, "Airport"));
        setSchoolDestinations(filterDestinations(data, "School"));
        setShopDestinations(filterDestinations(data, "Shop"));
      }
    } catch (error) {
      console.error("An error occurred while fetching destinations:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchLocation();
      setLocationFetched(true);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (locationFetched) fetchDestinations();
  }, [region]);

  const closeMenuOnOutsideClick = (event: { target: any }) => {
    if (
      isOpen &&
      tripDropdownRef.current &&
      !tripDropdownRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeMenuOnOutsideClick);

    return () => {
      document.removeEventListener("click", closeMenuOnOutsideClick);
    };
  }, [isOpen]);

  const tripDropdownRef = useRef<HTMLDivElement>(null);

  const [selectedDestination, setSelectedDestination] = useState<Destination>();

  const handleDestinationSelect = (destination: Destination) => {
    setSelectedDestination(destination);
    setIsOpen(true); // Open the CarpoolForm when a destination is selected
  };
  return (
    <>
      {!isOpen ? (
        <div className={`flex flex-col items-center justify-center`}>
          <div className="max-w-md space-y-4 px-6 sm:px-1 w-full animate-in fade-in slide-in-from-bottom-4 duration-1200 ease-in-out">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-black px-4 text-white py-2 my-2 rounded-full shadow-lg h-fit flex items-center  w-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path
                  fill="rgb(156 163 175)"
                  d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"
                />
              </svg>
              <p className="pl-1 text-gray-400">Anywhere</p>
            </button>
          </div>
          <div className="max-w-full">
            <AllTripsGrid
              userLocation={region}
              onSelectDestination={handleDestinationSelect}
              destinations={destinations}
              airportDestinations={airportDestinations}
              schoolDestinations={schoolDestinations}
              shopDestinations={shopDestinations}
              cinemaDestinations={cinemaDestinations}
            />
          </div>
          {!user ? (
            <>
              <HowCruiseoWorks />
              <HowFaresCalculated />
              <WhyChooseCruiseo />
            </>
          ) : (
            <>
              <CarpoolGrid user={user} trips={trips} />
            </>
          )}
        </div>
      ) : (
        <CarpoolForm
          user={user}
          selectedDestination={selectedDestination}
          onClose={() => setIsOpen(!isOpen)}
          allDestinations={destinations}
        />
      )}
    </>
  );
}
