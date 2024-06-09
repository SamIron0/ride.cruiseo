import { Tables } from "@/supabase/types"
import axios from "axios"

const apiKey = "AIzaSyBrJKwpf7vX885NfARu7oCex9q0s3r0SuM"

export async function getLatLong(
  address: string
): Promise<[number, number] | null> {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
  const response = await axios.get(url)
  if (response.data.status === "OK") {
    const location = response.data.results[0].geometry.location
    return [location.lat, location.lng]
  }
  return null
}
const calculateDistance = async (origin?: string, destination?: string) => {
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}`

  try {
    const response = await axios.get(url)
    const result = response.data
    const distanceInMeters = result.rows[0].elements[0].distance.value
    return distanceInMeters
  } catch (error) {
    console.error("Error fetching data: ", error)
  }
}
export async function calculatePrice(
  origin?: string,
  destination?: string,
  trip?: Tables<"trips">,
  wait?: number
) {
  // Example values
  let distanceInMiles = await calculateDistance(origin, destination)

  let price = calculateTripPrice(distanceInMiles, wait || 0)
  const res = price.toFixed(2)
  return { res }
}
function calculateTripPrice(distance: number, waitTime: number): number {
  return (
    3.95 +
    Math.floor(distance / 100) * 0.19 +
    Math.floor((waitTime * 60) / 20) * 0.19
  )
}
