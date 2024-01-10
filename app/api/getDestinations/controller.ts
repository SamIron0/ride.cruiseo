import { GeoCoordinate, Destination } from "@/types";
import axios from "axios";
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
const addressToGeocodingAPI = (destination: string) => {
    // Encode the address
    const encodedAddress = encodeURIComponent(destination);

    // Construct the Geocoding API URL
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

    return apiUrl;
};

// FIlter all destination to only show relevant destinations
// ... (your existing code)

export async function filterDestinations(region: any, destinations: any[] | null) {
    const toCheck = ["Superstore", "Walmart"];

    // Variable to store closest Real Canadian Superstore
    let closestRCS = {
        distance: 0,
        destination: null
    };

    // Variable to store closest Walmart
    let closestWalmart = {
        distance: 0,
        destination: null
    };

    const result: Destination[] = [];

    const promises: Promise<void>[] = (destinations || []).map(async (destination) => {
        if (destination.category === 'Shop') {
            const geocodingApiUrl = addressToGeocodingAPI(destination.address);
            try {
                const response = await axios.get(geocodingApiUrl);
                const destinationGeoCode: GeoCoordinate = {
                    latitude: response.data.results[0].geometry.location.lat,
                    longitude: response.data.results[0].geometry.location.lng
                };
                const userGeoCode: GeoCoordinate = {
                    latitude: region.latitude,
                    longitude: region.longitude
                };
                const distance = calculateHaversineDistance(userGeoCode, destinationGeoCode);

                if (destination.name == toCheck[0]) {
                    if (distance < closestRCS.distance || closestRCS.distance === 0) {
                        closestRCS = {
                            distance: distance,
                            destination: destination
                        };
                    }
                } else {

                    if (distance < closestWalmart.distance || closestWalmart.distance === 0) {
                        closestWalmart = {
                            distance: distance,
                            destination: destination
                        };
                    }
                }
            } catch (error) {
                console.error('Error fetching Geocoding API:', error);
            }
        } else {
            result.push(destination);
        }
    });

    await Promise.all(promises);

    if (closestRCS.destination) {
        result.push(closestRCS.destination);
       //
    }

    if (closestWalmart.destination) {
        result.push(closestWalmart.destination);
    }

    return result;
}
