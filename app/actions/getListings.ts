import { GeoCoordinate } from "@/types";

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(
  params: IListingsParams,
  userLocation?: GeoCoordinate
) {
  let listings = [];

  try {
    const url = '/api/getDestinations';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userLocation)
    };
    const response = await fetch(url, options);
    listings = await response.json();
  } catch (error) {
    console.error('An error occurred while fetching destinations:', error);
  }
  return listings;
}
