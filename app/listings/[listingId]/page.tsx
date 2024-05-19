'use client';

import ClientOnly from '@/components/ClientOnly';
import EmptyState from '@/components/EmptyState';
import ListingClient from './ListingClient';
import { createServerSupabaseClient } from '@/app/supabase-server';
import getListingById from '@/app/actions/getListingById';

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params.listingId);
  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient listing={listing} />
    </ClientOnly>
  );
};

export default ListingPage;
