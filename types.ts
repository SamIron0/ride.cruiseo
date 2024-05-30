import { Json } from "./types_db"

export interface Date {
  date: string
  hour: string
  minute: string
  ampm: string
}
export interface Trip {
  id: string
  user_id?: string
  origin?: string
  destination?: string
  price?: number
  pickup?: Date
  status?: string
  dropoff?: Date
}

export interface GeoCoordinate {
  lat: number
  lon: number
}
export interface Destination {
  id: string
  address: string
  category: string
  photo: string
  trip_ids?: string[]
  name: string
  times?: string[] | null
  activeTrips?: Trip[] | null
  coordinates?: GeoCoordinate | null
}
export interface UserDetails {
  trips: Trip[] | null
  avatar_url: string | null
  billing_address: Json | null
  full_name: string | null
  id: string
  address: string | null
  payment_method: Json | null
  geolocation?: GeoCoordinate | null
}
