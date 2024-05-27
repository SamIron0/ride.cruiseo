"use client"

import ClientOnly from "@/components/ClientOnly"
import EmptyState from "@/components/EmptyState"
import ListingClient from "./ListingClient"
import { getDestinationById } from "@/db/admin"

interface IParams {
  listingId?: string
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getDestinationById(params?.listingId as string)
  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ListingClient listing={listing} />
    </ClientOnly>
  )
}

export default ListingPage
