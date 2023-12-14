import { Json } from "./types_db"

export interface Trip {
    origin: string | null
    destination: string | null
    id: string | null
    date: string | null
    user_id: string
    price: string | null
    status: string | null
}


export interface UserDetails {
    trips: Trip[] | null
    avatar_url: string | null
    billing_address: Json | null
    full_name: string | null
    id: string
    payment_method: Json | null
}


