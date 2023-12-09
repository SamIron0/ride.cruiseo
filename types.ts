import { Json } from "./types_db"

export interface Trip {
    origin: string | null,
    destination: string | null,
    email: string | undefined,
    date: string | null,
    price: string | null
}


export interface UserDetails {
    trips: Json[] | null
    avatar_url: string | null
    billing_address: Json | null
    full_name: string | null
    id: string
    payment_method: Json | null
}


