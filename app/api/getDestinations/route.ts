import { createRouteHandlerClient, createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Trip } from "@/types";
import { Database } from "@/types_db";
import { cookies } from "next/headers";
import { createTrip, deleteTrip } from "@/utils/supabase-admin";
import { retrieveDestinations } from "@/utils/supabase-admin";

function calculateHaversineDistance(coord1: GeoCoordinate, coord2: GeoCoordinate): number {
    const earthRadius = 6371; // Earth's radius in kilometers

    const dLat = toRadians(coord2.latitude - coord1.latitude);
    const dLon = toRadians(coord2.longitude - coord1.longitude);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(coord1.latitude)) * Math.cos(toRadians(coord2.latitude)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c; // Distance in kilometers
    return distance;
}

function toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}

export async function POST(req: Request,) {
    let location = ''
    if (req.method === 'POST') {
        try {
            const fetchLocation = async () => {
                try {
                    const res = await fetch('/api/getLocation');
                    if (res.status === 200) { // valid response
                        const data = await res.json();
                        location = data.location.region_name;
                    } else {
                        console.error("An error occurred while fetching the location");
                    }
                } catch (error) {
                    console.error("An error occurred while fetching the location:", error);
                }
            };


            interface GeoCoordinate {
                latitude: number;
                longitude: number;
            }


            // Example usage:
            const point1 = new GeoCoordinate(37.7749, -122.4194); // San Francisco, CA
            const point2 = new GeoCoordinate(34.0522, -118.2437); // Los Angeles, CA

            const distance = calculateHaversineDistance(point1, point2);
            console.log(`The distance between the two points is approximately ${distance.toFixed(2)} kilometers.`);

            const destinations = await retrieveDestinations(location);
            let response;
            // filter destinations to only give contain destinations based on users location

            if (destinations != undefined) {
                response = destinations;
                return new Response(JSON.stringify(response), {
                    status: 200
                });
            }

        } catch (err: any) {
            return new Response(JSON.stringify({ error: { statusCode: 500, message: err.message } }));
        }
    } else {
        return new Response(JSON.stringify('Method Not Allowed'));

    }
}
