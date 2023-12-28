import { Json } from "./types_db"

export interface Trip {
    origin: string
    destination: string
    id: string
    date: string
    user_id: string
    price: string
    status: string
}
export interface Destination {
    id: string
    address: string
    category: string
    photo: string
    trip_ids: string
    name: string
}
export interface UserDetails {
    trips: Trip[] | null
    avatar_url: string | null
    billing_address: Json | null
    full_name: string | null
    id: string
    payment_method: Json | null
}


