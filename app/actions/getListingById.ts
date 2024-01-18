'use client'
import { useListings } from '../providers/ListingProvider';
interface IParams {
  listingId?: string;
}

export default async function getListingById(params: IParams) {
  const { allListings } = useListings();

  try {
    const destinationWithId = allListings?.find(
      (destination) => destination.id == params.listingId
    );

    return destinationWithId;
  } catch (error: any) {
    throw new Error(error);
  }
}
