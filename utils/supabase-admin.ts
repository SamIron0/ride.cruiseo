import { Destination, Trip } from '@/types';
import { toDateTime } from './helpers';
import { stripe } from './stripe';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';
import type { Database } from 'types_db';
import { v4 as uuidv4 } from 'uuid';

type Product = Database['public']['Tables']['products']['Row'];
type Price = Database['public']['Tables']['prices']['Row'];
// Note: supabaseAdmin uses the SERVICE_ROLE_KEY which you must only use in a secure server-side context
// as it has admin privileges and overwrites RLS policies!
const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export const retrieveDestinations = async (): Promise<Destination[] | null> => {
  try {
    const { data: destinations } = await supabaseAdmin
      .from('destinations')
      .select('*');

    if (!destinations || destinations.length === 0) {
      return null;
    }

    const enhancedDestinations = await Promise.all(
      destinations.map(async (destination) => {
        if (destination.trip_ids && destination.trip_ids.length > 0) {
          const tripDates = await Promise.all(
            destination.trip_ids.map(async (tripId) => {
              const { data: trip } = await supabaseAdmin
                .from('trips')
                .select('date')
                .eq('id', tripId)
                .single();

              return trip ? trip.date : null;
            })
          );

          // Filter out null values and add times array to the destination
          destination.times = tripDates.filter((date) => date !== null) as string[];
        } else {
          // If trip_ids array is empty or undefined, set times to an empty array
          destination.times = [];
        }

        return destination;
      })
    );

    return enhancedDestinations;
  } catch (error) {
    console.error('Error retrieving destinations:');
    return null;
  }
};

export const retrieveTimes = async (destinations: Destination[]) => {
  const { data: times } = await supabaseAdmin
    .from('destinations')
    .select('')
  return times;
}
export const deleteTrip = async (tripId: string, userId: string) => {
  // delete from trips array
  await supabaseAdmin
    .from("trips")
    .delete()
    .eq("id", tripId)

  // delete from users array
  const user = await supabaseAdmin
    .from('users')
    .select('trips')
    .eq('id', userId)
    .single();

  if (user.data && user.data.trips) {
    user.data.trips = user.data.trips.filter(trip => trip.id !== tripId);
    const { data, error } = await supabaseAdmin
      .from('users')
      .update({ trips: user.data.trips })
      .eq('id', userId);
  }
}
export const createTrip = async ({
  trip,
  userId,
}: {
  trip: Trip;
  userId: string;
}) => {
  // Step 1: Insert the trip into the "trips" table
  const { data: tripData, error: tripError } = await supabaseAdmin
    .from("trips")
    .insert([
      {
        origin: trip.origin,
        destination_id: trip.destination_id,
        id: trip.id,
        date: trip.date,
        user_id: userId,
        price: trip.price,
        status: "Pending",
      },
    ]);

  if (tripError) {
    console.error("Error inserting trip:", tripError);
    throw tripError;
  }

  // Step 2: Retrieve the corresponding destination from the "destinations" table
  const { data: destinationData, error: destinationError } = await supabaseAdmin
    .from("destinations")
    .select("*")
    .eq("id", trip.destination_id)
    .single();
  console.log("destinationData add. : " + destinationData?.address)

  if (destinationError) {
    console.error("Error retrieving destination:", destinationError);
    throw destinationError;
  }

  const destination = destinationData as Destination;
  console.log("destination add. : " + destination?.address)
  console.log("trip ids: " + trip.id)

  // Step 3: Update the "trip_ids" array in the retrieved destination
  const tripIds: string[] = []
  tripIds.push(trip.id);
  console.log("tripIds: " + tripIds)
  //console.log("destinations: " + destination.trip_ids)

  // Step 4: Update the destination in the "destinations" table
  const { error: updateDestinationError } = await supabaseAdmin
    .from("destinations")
    .update({
      id: destinationData.id,
      trip_ids: [trip.id],
    })
    .eq("id", destination.id);


  if (updateDestinationError) {
    console.error("Error updating destination:", updateDestinationError);
    throw updateDestinationError;
  }

  // Step 5: Update the user's trips with the new trip
  let trips = await retrieveUsersTrips(userId);
  trips.push(trip);

  await supabaseAdmin.from("users").update({ trips }).eq("id", userId);


  // Step 6: Return the new trip ID
  return trip.id;
};

export const retrieveUsersTrips = async (userId: string) => {
  const { data: users } = await supabaseAdmin
    .from('users')
    .select('trips')
    .eq('id', userId);

  let userTrips = users?.[0]?.trips || [];

  return userTrips;
}

export const getTrip = async (tripId: string) => {
  const { data: trip } = await supabaseAdmin
    .from('trips')
    .select('*')
    .eq('id', tripId);

  return trip;
}

const upsertProductRecord = async (product: Stripe.Product) => {
  const productData: Product = {
    id: product.id,
    active: product.active,
    name: product.name,
    description: product.description ?? null,
    image: product.images?.[0] ?? null,
    metadata: product.metadata
  };

  const { error } = await supabaseAdmin.from('products').upsert([productData]);
  if (error) throw error;
  console.log(`Product inserted/updated: ${product.id}`);
};

const upsertPriceRecord = async (price: Stripe.Price) => {
  const priceData: Price = {
    id: price.id,
    product_id: typeof price.product === 'string' ? price.product : '',
    active: price.active,
    currency: price.currency,
    description: price.nickname ?? null,
    type: price.type,
    unit_amount: price.unit_amount ?? null,
    interval: price.recurring?.interval ?? null,
    interval_count: price.recurring?.interval_count ?? null,
    trial_period_days: price.recurring?.trial_period_days ?? null,
    metadata: price.metadata
  };

  const { error } = await supabaseAdmin.from('prices').upsert([priceData]);
  if (error) throw error;
  console.log(`Price inserted/updated: ${price.id}`);
};

const createOrRetrieveCustomer = async ({
  email,
  uuid
}: {
  email: string;
  uuid: string;
}) => {
  const { data, error } = await supabaseAdmin
    .from('customers')
    .select('stripe_customer_id')
    .eq('id', uuid)
    .single();
  if (error || !data?.stripe_customer_id) {
    // No customer record found, let's create one.
    const customerData: { metadata: { supabaseUUID: string }; email?: string } =
    {
      metadata: {
        supabaseUUID: uuid
      }
    };
    if (email) customerData.email = email;
    const customer = await stripe.customers.create(customerData);
    // Now insert the customer ID into our Supabase mapping table.
    const { error: supabaseError } = await supabaseAdmin
      .from('customers')
      .insert([{ id: uuid, stripe_customer_id: customer.id }]);
    if (supabaseError) throw supabaseError;
    console.log(`New customer created and inserted for ${uuid}.`);
    return customer.id;
  }
  return data.stripe_customer_id;
};

/**
 * Copies the billing details from the payment method to the customer object.
 */
const copyBillingDetailsToCustomer = async (
  uuid: string,
  payment_method: Stripe.PaymentMethod
) => {
  //Todo: check this assertion
  const customer = payment_method.customer as string;
  const { name, phone, address } = payment_method.billing_details;
  if (!name || !phone || !address) return;
  //@ts-ignore
  await stripe.customers.update(customer, { name, phone, address });
  const { error } = await supabaseAdmin
    .from('users')
    .update({
      billing_address: { ...address },
      payment_method: { ...payment_method[payment_method.type] }
    })
    .eq('id', uuid);
  if (error) throw error;
};

const manageSubscriptionStatusChange = async (
  subscriptionId: string,
  customerId: string,
  createAction = false
) => {
  // Get customer's UUID from mapping table.
  const { data: customerData, error: noCustomerError } = await supabaseAdmin
    .from('customers')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single();
  if (noCustomerError) throw noCustomerError;

  const { id: uuid } = customerData!;

  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ['default_payment_method']
  });
  // Upsert the latest status of the subscription object.
  const subscriptionData: Database['public']['Tables']['subscriptions']['Insert'] =
  {
    id: subscription.id,
    user_id: uuid,
    metadata: subscription.metadata,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
    //TODO check quantity on subscription
    // @ts-ignore
    quantity: subscription.quantity,
    cancel_at_period_end: subscription.cancel_at_period_end,
    cancel_at: subscription.cancel_at
      ? toDateTime(subscription.cancel_at).toISOString()
      : null,
    canceled_at: subscription.canceled_at
      ? toDateTime(subscription.canceled_at).toISOString()
      : null,
    current_period_start: toDateTime(
      subscription.current_period_start
    ).toISOString(),
    current_period_end: toDateTime(
      subscription.current_period_end
    ).toISOString(),
    created: toDateTime(subscription.created).toISOString(),
    ended_at: subscription.ended_at
      ? toDateTime(subscription.ended_at).toISOString()
      : null,
    trial_start: subscription.trial_start
      ? toDateTime(subscription.trial_start).toISOString()
      : null,
    trial_end: subscription.trial_end
      ? toDateTime(subscription.trial_end).toISOString()
      : null
  };

  const { error } = await supabaseAdmin
    .from('subscriptions')
    .upsert([subscriptionData]);
  if (error) throw error;
  console.log(
    `Inserted/updated subscription [${subscription.id}] for user [${uuid}]`
  );

  // For a new subscription copy the billing details to the customer object.
  // NOTE: This is a costly operation and should happen at the very end.
  if (createAction && subscription.default_payment_method && uuid)
    //@ts-ignore
    await copyBillingDetailsToCustomer(
      uuid,
      subscription.default_payment_method as Stripe.PaymentMethod
    );
};

export {
  upsertProductRecord,
  upsertPriceRecord,
  createOrRetrieveCustomer,
  manageSubscriptionStatusChange
};
