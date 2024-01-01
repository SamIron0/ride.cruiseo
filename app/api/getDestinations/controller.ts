import { GeoCoordinate, Destination } from "@/types";
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
const addressToGeocodingAPI = (address: string) => {
    // Replace spaces with '+'
    const formattedAddress = address.replace(/\s+/g, '+');

    // Encode the address
    const encodedAddress = encodeURIComponent(formattedAddress);

    // Construct the Geocoding API URL
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

    return apiUrl;
};


export function filterDestinations(region: any, destinations: any[] | null) {
    destinations?.map((destination) => {

        const geocodingApiUrl = addressToGeocodingAPI(destination);

        console.log(geocodingApiUrl);

    })
    const userGeoCode: GeoCoordinate = {
        latitude: region.latitude,
        longitude: region.latitude
    };
    //const distance = calculateHaversineDistance(point1, point2);

}