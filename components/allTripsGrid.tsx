"use client";

import { DestinationCard } from "./destinationCard";
import { CarpoolCard } from "./ui/carpool-card";
import { Destination } from "@/types";
import { Tabs } from "@geist-ui/core";
import { User } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

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
  const getPrice = async (destination: Destination) => {
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
        return data;
      } else {
        // Handle non-OK response
        console.error("Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while fetching price:", error);
    }
  };
  const align = isLargeScreen ? "center" : "";
  const leftSpace = isLargeScreen ? 0 : "";

  return (
   <></>
  );
}
