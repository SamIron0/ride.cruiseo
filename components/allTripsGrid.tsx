"use client";
import { User } from "@supabase/supabase-js";
import { CarpoolCard } from "./ui/carpool-card";
import { Destination } from "@/types";
import { DestinationCard } from "./destinationCard";
import { Tabs } from "@geist-ui/core";
import { useState, useEffect } from "react";
import { PriceProvider, usePrice } from "./priceProvider";
const { updatePrice } = usePrice() as {
  updatePrice: (newPrice: string) => void;
};

interface AllTripsGridProps {
  userLocation: any;
  onSelectDestination: (destination: Destination) => void;
  destinations: Destination[];
  airportDestinations: Destination[];
  schoolDestinations: Destination[];
  shopDestinations: Destination[];
  cinemaDestinations: Destination[];
}

export function AllTripsGrid({
  userLocation,
  onSelectDestination,
  destinations,
  airportDestinations,
  schoolDestinations,
  shopDestinations,
  cinemaDestinations,
}: AllTripsGridProps) {
  const [activeTab, setActiveTab] = useState("1");

  function handleTabChange(value: any) {
    setActiveTab(value);
  }

  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);

  useEffect(() => {
    // Update the state based on the initial window width
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth > 640); // Adjust the threshold as needed
    };
    // Attach the event listener for resizing
    window.addEventListener("resize", checkScreenSize);

    // Initial check
    checkScreenSize();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const align = isLargeScreen ? "center" : "";
  const leftSpace = isLargeScreen ? 0 : "";

  const getPrice = async (workerID: number, userDestination: Destination) => {
    //console.log("user location: ", userLocation);
    //console.log("user destination: ", userDestination.address);
    while (userDestination.price == undefined) {
      try {
        console.log("destinationlongitude: ", userDestination.coordinates?.lon);
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
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <Tabs initialValue="1" align={align} className="tabs" leftSpace={leftSpace}>
      <Tabs.Item
        label={
          <>
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="M240-200v40q0 17-11.5 28.5T200-120h-40q-17 0-28.5-11.5T120-160v-320l84-240q6-18 21.5-29t34.5-11h440q19 0 34.5 11t21.5 29l84 240v320q0 17-11.5 28.5T800-120h-40q-17 0-28.5-11.5T720-160v-40H240Zm-8-360h496l-42-120H274l-42 120Zm-32 80v200-200Zm100 160q25 0 42.5-17.5T360-380q0-25-17.5-42.5T300-440q-25 0-42.5 17.5T240-380q0 25 17.5 42.5T300-320Zm360 0q25 0 42.5-17.5T720-380q0-25-17.5-42.5T660-440q-25 0-42.5 17.5T600-380q0 25 17.5 42.5T660-320Zm-460 40h560v-200H200v200Z" />
            </svg>
            All Nearby
          </>
        }
        value="1"
      >
        <div className="sm:px-24 ">
          <div className="grid px-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4  gap-4 ">
            {destinations?.map((destination) => (
              <div
                className="mt-2 cursor-pointer"
                onClick={() => onSelectDestination(destination)}
              >
                <DestinationCard
                  destination={destination}
                  userLocation={userLocation}
                />
              </div>
            ))}
          </div>
        </div>
      </Tabs.Item>
      <Tabs.Item
        label={
          <>
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="38"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="M640-80q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170T640-80Zm0-80q66 0 113-47t47-113q0-66-47-113t-113-47q-66 0-113 47t-47 113q0 66 47 113t113 47Zm-480 0q-33 0-56.5-23.5T80-240v-304q0-8 1.5-16t4.5-16l80-184h-6q-17 0-28.5-11.5T120-800v-40q0-17 11.5-28.5T160-880h280q17 0 28.5 11.5T480-840v40q0 17-11.5 28.5T440-760h-6l66 152q-19 10-36 21t-32 25l-84-198h-96l-92 216v304h170q5 21 13.5 41.5T364-160H160Zm480-440q-42 0-71-29t-29-71q0-42 29-71t71-29v200q0-42 29-71t71-29q42 0 71 29t29 71H640Z" />
            </svg>{" "}
            Shop{" "}
          </>
        }
        value="2"
      >
        <div className="sm:px-24 ">
          <div className="grid px-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4  gap-4 ">
            {shopDestinations?.map((shop) => (
              <div
                className="mt-2 cursor-pointer"
                onClick={() => onSelectDestination(shop)}
              >
                <DestinationCard
                  destination={shop}
                  userLocation={userLocation}
                />
              </div>
            ))}
          </div>
        </div>
      </Tabs.Item>
      <Tabs.Item
        label={
          <>
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="38"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="M120-120v-80h720v80H120Zm74-200L80-514l62-12 70 62 192-52-162-274 78-24 274 246 200-54q32-9 58 12t26 56q0 22-13.5 39T830-492L194-320Z" />
            </svg>
            Airport
          </>
        }
        value="3"
      >
        <div className="sm:px-24 ">
          <div className="grid px-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4  gap-4 ">
            {airportDestinations?.map((airport) => (
              <div
                className="mt-2 cursor-pointer"
                onClick={() => onSelectDestination(airport)}
              >
                <DestinationCard
                  destination={airport}
                  userLocation={userLocation}
                />
              </div>
            ))}
          </div>
        </div>
      </Tabs.Item>
      <Tabs.Item
        label={
          <>
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z" />
            </svg>{" "}
            School{" "}
          </>
        }
        value="4"
      >
        <div className="sm:px-24 ">
          <div className="grid px-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4  gap-4 ">
            {schoolDestinations?.map((school) => (
              <div
                className="mt-2 cursor-pointer"
                onClick={() => onSelectDestination(school)}
              >
                <DestinationCard
                  destination={school}
                  userLocation={userLocation}
                />
              </div>
            ))}
          </div>
        </div>
      </Tabs.Item>
      <Tabs.Item
        label={
          <>
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="m160-800 80 160h120l-80-160h80l80 160h120l-80-160h80l80 160h120l-80-160h120q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800Zm0 240v320h640v-320H160Zm0 0v320-320Z" />
            </svg>
            Cinema
          </>
        }
        value="5w"
      >
        <div className="sm:px-24 ">
          <div className="grid px-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4  gap-4 ">
            {cinemaDestinations?.map((cinema) => (
              <div
                className="mt-2 cursor-pointer"
                onClick={() => onSelectDestination(cinema)}
              >
                <DestinationCard
                  destination={cinema}
                  userLocation={userLocation}
                />
              </div>
            ))}
          </div>
        </div>
      </Tabs.Item>
    </Tabs>
  );
}
