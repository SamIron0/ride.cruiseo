import { GeoCoordinate, Destination } from "@/types";
import axios from "axios";

interface AddressComponents {
  long_name: string;
  short_name: string;
  types: string[];
}

interface GeocodeResult {
  formatted_address: string;
  address_components: AddressComponents[];
}

const addressToGeocodingAPI = (address: string) => {
  // Encode the address
  const encodedAddress = encodeURIComponent(destination);

  // Construct the Geocoding API URL
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

  return apiUrl;
};

export async function getAddressJson(origin: any, destination: string) {
  console.log("Building origin and destination json");
  originJson = {};
  destinationJson = {};

  // Call the function

  let originaddress2;
  const [originaddress1, originaddress2] = reverseGeocode(
    origin.latitude,
    origin.longitude
  );
  console.log("Origin address Line 1:", originaddress1);
  console.log("Address Line 2:", originaddress2);

  const geocodingApiUrl = addressToGeocodingAPI(destination);
  try {
    const destinationGeocode = await axios.get(geocodingApiUrl);
  } catch (error) {}

  originJson = {
    origin: {
      addressLine1: originaddress1,
      addressLine2: originaddress2,
      source: "SEARCH",
      latitude: origin.latitude,
      longitude: origin.longitude,
      provider: "uber_places",
    },
  };
  console.log("Origin json:", originJson);
  
  destination = {
    origin: {
      addressLine1: destination,
      source: "SEARCH",
      latitude: destinationGeocode.data.results[0].geometry.location.lat,
      longitude: destinationGeocode.data.results[0].geometry.location.lng,
      provider: "uber_places",
    },
  };
  console.log("Destination json:", destinationJson);

  return [originJson, destinationJson];
}

async function reverseGeocode(
  latitude: number,
  longitude: number
): Promise<[string, string] | null> {
  try {
    const response = await axios.get<GeocodeResult[]>(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`
    );

    const result = response.data[0];

    if (result) {
      const addressLine1 = result.formatted_address;

      // Extract address line 2 based on the types of components
      let addressLine2 = "";
      result.address_components.forEach((component) => {
        if (component.types.includes("route")) {
          addressLine2 = component.long_name;
        }
      });

      return [addressLine1, addressLine2];
    }

    return null;
  } catch (error) {
    console.error("Error during reverse geocoding:", error);
    return null;
  }
}
