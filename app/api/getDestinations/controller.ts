import { GeoCoordinate } from "@/types";

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
export function filterDestinations(region: any, destinations: any) {
    
    console.log("filtering: " + region);
    console.log("destination: " + destinations);
    console.log("longitude: " + regionƒ.longitude);
    const point2: GeoCoordinate = {
        latitude: 34.0522,
        longitude: -118.2437
    };
    
    // const distance = calculateHaversineDistance(point1, point2);

}