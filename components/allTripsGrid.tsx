'use client'
import { User } from "@supabase/supabase-js"
import { CarpoolCard } from "./ui/carpool-card";
import { Destination, Trip } from "@/types";
import { DestinationCard } from "./destinationCard";
import { Tabs, } from '@geist-ui/core'
import { useState, useEffect } from 'react'

interface AllTripsGridProps {
    onSelectDestination: (destination: string) => void;
}

export function AllTripsGrid({ onSelectDestination }: AllTripsGridProps) {
    const [activeTab, setActiveTab] = useState('1');

    function handleTabChange(value: any) {
        setActiveTab(value);
    };

    const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);

    useEffect(() => {
        // Update the state based on the initial window width
        const checkScreenSize = () => {
            setIsLargeScreen(window.innerWidth > 640); // Adjust the threshold as needed
        };
        // Attach the event listener for resizing
        window.addEventListener('resize', checkScreenSize);

        // Initial check
        checkScreenSize();

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);



    const align = isLargeScreen ? "center" : '';
    const leftSpace = isLargeScreen ? 0 : '';

    const [region, setRegion] = useState("");
    const [locationFetched, setLocationFetched] = useState(false); // New state variable
    const [destinations, setAllDestinations] = useState<Destination[]>([]); // New state variable
    const [airportDestinations, setAirportDestinations] = useState<Destination[]>([]); // New state variable
    const [shopDestinations, setShopDestinations] = useState<Destination[]>([]); // New state variable
    const [schoolDestinations, setSchoolDestinations] = useState<Destination[]>([]); // New state variable
    const [cinemaDestinations, setCinemaDestinations] = useState<Destination[]>([]); // New state variable
    function filterDestinations(destinations: Destination[], category: string): Destination[] {
        const result: Destination[] = [];
        destinations.map((destination) => {
            if (destination.category == category) {
                result.push(destination)
            }
        })
        return result
    }

    const fetchLocation = async () => {
        try {
            const res = await fetch('/api/getLocation');
            if (res.status === 200) { // valid response
                const data = await res.json();
                setRegion(data.location.region_name);
                setLocationFetched(true); // Mark location as fetched
            } else {
                console.error("An error occurred while fetching the location");
            }
        } catch (error) {
            console.error("An error occurred while fetching the location:", error);
        }
    };
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
            setAllDestinations(data);

            setCinemaDestinations(filterDestinations(data, 'Cinema'));
            setAirportDestinations(filterDestinations(data, 'Airport'));
            setSchoolDestinations(filterDestinations(data, 'School'));
            setShopDestinations(filterDestinations(data, 'Shop'));

        } catch (error) {
            console.error("An error occurred while fetching destinations:", error);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            // Fetch location only if it hasn't been fetched yet
            await fetchLocation();
            // Fetch data only when location has been fetched
            await fetchDestinations();
        };
        fetchData()
    }, []);

    return (

        <Tabs initialValue="1" align={align} className="tabs" leftSpace={leftSpace}>
            <Tabs.Item label={<> <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
            >
                <path
                    d="M240-200v40q0 17-11.5 28.5T200-120h-40q-17 0-28.5-11.5T120-160v-320l84-240q6-18 21.5-29t34.5-11h440q19 0 34.5 11t21.5 29l84 240v320q0 17-11.5 28.5T800-120h-40q-17 0-28.5-11.5T720-160v-40H240Zm-8-360h496l-42-120H274l-42 120Zm-32 80v200-200Zm100 160q25 0 42.5-17.5T360-380q0-25-17.5-42.5T300-440q-25 0-42.5 17.5T240-380q0 25 17.5 42.5T300-320Zm360 0q25 0 42.5-17.5T720-380q0-25-17.5-42.5T660-440q-25 0-42.5 17.5T600-380q0 25 17.5 42.5T660-320Zm-460 40h560v-200H200v200Z"
                />
            </svg>
                All Destinations
            </>
            }
                value="1">
                <div className="sm:px-24 ">
                    <div className="grid px-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4  gap-4 ">
                        {destinations?.map((destination) => (
                            <div className="mt-2">
                                <button
                                    onClick={() => onSelectDestination(destination.address)}>
                                    <DestinationCard destination={destination} />
                                </button>
                            </div>
                        ))}</div>
                </div>
            </Tabs.Item>
            <Tabs.Item
                label={<> <svg xmlns="http://www.w3.org/2000/svg" height="38" viewBox="0 -960 960 960" width="24">
                    <path d="M640-80q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170T640-80Zm0-80q66 0 113-47t47-113q0-66-47-113t-113-47q-66 0-113 47t-47 113q0 66 47 113t113 47Zm-480 0q-33 0-56.5-23.5T80-240v-304q0-8 1.5-16t4.5-16l80-184h-6q-17 0-28.5-11.5T120-800v-40q0-17 11.5-28.5T160-880h280q17 0 28.5 11.5T480-840v40q0 17-11.5 28.5T440-760h-6l66 152q-19 10-36 21t-32 25l-84-198h-96l-92 216v304h170q5 21 13.5 41.5T364-160H160Zm480-440q-42 0-71-29t-29-71q0-42 29-71t71-29v200q0-42 29-71t71-29q42 0 71 29t29 71H640Z" />
                </svg> Groceries </>} value="2">
                <div className="sm:px-24 ">
                    <div className="grid px-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4  gap-4 ">
                        {shopDestinations?.map((shop) => (
                            <button
                                onClick={() => onSelectDestination(shop.address)}>
                                <DestinationCard destination={shop} />
                            </button>))}</div>
                </div>
            </Tabs.Item>
            <Tabs.Item
                label={<> <svg xmlns="http://www.w3.org/2000/svg" height="38" viewBox="0 -960 960 960" width="24">
                    <path d="M120-120v-80h720v80H120Zm74-200L80-514l62-12 70 62 192-52-162-274 78-24 274 246 200-54q32-9 58 12t26 56q0 22-13.5 39T830-492L194-320Z" />
                </svg>
                    Airport
                </>}
                value="3">
                <div className="sm:px-24 ">
                    <div className="grid px-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4  gap-4 ">
                        {airportDestinations?.map((airport) => (
                            <button
                                onClick={() => onSelectDestination(airport.address)}>
                                <DestinationCard destination={airport} />
                            </button>))}</div>
                </div>
            </Tabs.Item>
            <Tabs.Item
                label={<> <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z" /></svg> School </>} value="4">
                <div className="sm:px-24 ">
                    <div className="grid px-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4  gap-4 ">
                        {schoolDestinations?.map((school) => (
                            <button
                                onClick={() => onSelectDestination(school.address)}>
                                <DestinationCard destination={school} />
                            </button>))}</div>
                </div>
            </Tabs.Item>
            <Tabs.Item
                label={<> <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m160-800 80 160h120l-80-160h80l80 160h120l-80-160h80l80 160h120l-80-160h120q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800Zm0 240v320h640v-320H160Zm0 0v320-320Z" />
                </svg>
                    Cinema
                </>} value="5w">
                <div className="sm:px-24 ">
                    <div className="grid px-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4  gap-4 ">
                        {cinemaDestinations?.map((cinema) => (
                            <button
                                onClick={() => onSelectDestination(cinema.address)}>
                                <DestinationCard destination={cinema} />
                            </button>))}</div>
                </div>
            </Tabs.Item>
        </Tabs>
    )
}

