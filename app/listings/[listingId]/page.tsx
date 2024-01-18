import getListingById from '@/app/actions/getListingById';

import ClientOnly from '@/components/ClientOnly';
import EmptyState from '@/components/EmptyState';

import ListingClient from './ListingClient';
import { createServerSupabaseClient } from '@/app/supabase-server';

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  // const reservations = await getReservations(params);
  const supabase = createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const currentUser = user;
  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient listing={listing} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default ListingPage;
