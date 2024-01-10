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
  const encodedAddress = encodeURIComponent(address);

  // Construct the Geocoding API URL
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

  return apiUrl;
};

export async function getAddressJson(origin: any, destination: string) {
  //console.log('Building origin and destination json');
  let originJson = {};
  let destinationJson = {};
  let originAddress1: string | null = null;
  let originAddress2: string | null = null;

  const result = await reverseGeocode(origin.latitude, origin.longitude);


  // Now you can use originAddress1 and originAddress2 in your code

  let destinationGeocode;
  const geocodingApiUrl = addressToGeocodingAPI(destination);
  try {
    destinationGeocode = await axios.get(geocodingApiUrl);
  } catch (error) {}

  originJson = {
    addressLine1: result,
    source: "SEARCH",
    latitude: origin.latitude,
    longitude: origin.longitude,
    provider: "uber_places",
  };

  destinationJson = {
    addressLine1: destination,
    source: "SEARCH",
    latitude: destinationGeocode?.data.results[0].geometry.location.lat,
    longitude: destinationGeocode?.data.results[0].geometry.location.lng,
    provider: "uber_places",
  };

  return [originJson, destinationJson];
}

async function reverseGeocode(
  latitude: number,
  longitude: number
): Promise<[string, string] | null> {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );
    
    // Check if the status is OK
    if (response) {
      // Assuming there is at least one result
      const firstResult = response.data.results[0];
    
      // Extract the formatted address
      const formattedAddress = firstResult.formatted_address;
    
      // Now you can use the formattedAddress variable as needed
      //console.log(formattedAddress);
      return formattedAddress;
    } else {
      console.error('Geocoding request failed ');
    }
    
    return null;
  } catch (error) {
    console.error("Error during reverse geocoding:", error);
    return null;
  }
}
