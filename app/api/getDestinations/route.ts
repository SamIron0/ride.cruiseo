
import { retrieveDestinations } from "@/utils/supabase-admin";

class GeoCoordinate {
    constructor(public latitude: number, public longitude: number) { }
}

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

export async function POST(req: Request) {
    if (req.method === 'POST') {
        try {
            // Fetch user location
            const res = await fetch('/api/getLocation');
            if (res.status === 200) {
                const data = await res.json();
                const userLocation = new GeoCoordinate(data.latitude, data.longitude);

                // Example usage:
                const destinationPoint = new GeoCoordinate(34.0522, -118.2437); // Los Angeles, CA

                const distance = calculateHaversineDistance(userLocation, destinationPoint);
                console.log(`The distance between the two points is approximately ${distance.toFixed(2)} kilometers.`);

                // Retrieve destinations based on the user's location
                const destinations = await retrieveDestinations(data.location.region_name);

                if (destinations) {
                    // Filter destinations or perform other logic
                    return new Response(JSON.stringify(destinations), { status: 200 });
                }
            } else {
                console.error("An error occurred while fetching the location");
            }
        } catch (err: any) {
            return new Response(JSON.stringify({ error: { statusCode: 500, message: err.message } }));
        }
    }

    return new Response(JSON.stringify('Method Not Allowed'), { status: 405 });
}
