import { Json } from "./types_db"

export interface Trip {
    origin: string
    destination?: Destination
    destination_id: string
    id: string
    date: string
    user_ids: string[]
    price: string
    status: string
}

export interface GeoCoordinate {
    lat: number;
    lon: number;
}

export interface Destination {
    id: string
    address: string
    category: string
    photo: string
    trip_ids: string[]
    name: string
    times?: string[] | null
    activeTrips?: Trip[] | null
    price?: string | null
    coordinates?: GeoCoordinate | null
}

export interface UserDetails {
    trips: string[] | null
    avatar_url: string | null
    billing_address: Json | null
    full_name: string | null
    id: string
    payment_method: Json | null
}


