import { Tables } from "@/supabase/types"
import axios from "axios"

const calculateDistance = async (origin1?: string, destination1?: string) => {
  const apiKey = "AIzaSyBrJKwpf7vX885NfARu7oCex9q0s3r0SuM"
  const origin = "37.7749,-122.4194" // San Francisco
  const destination = "34.0522,-118.2437" // Los Angeles

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
  trip?: Tables<"trips">
) {
  // Example values
  let distanceInMiles = await calculateDistance(origin, destination)
  let baseFare = 2.5
  let costPerMile = 1.25
  let costPerMinute = 0.2
  let estimatedDurationMinutes = 20 // This would be the estimated duration
  let minimumFare = 5.0
  const res = calculateTripPrice(
    baseFare,
    costPerMile,
    distanceInMiles,
    costPerMinute,
    estimatedDurationMinutes,
    minimumFare
  )
  return distanceInMiles
}
function calculateTripPrice(
  baseFare: number,
  costPerMile: number,
  distanceInMiles: number,
  costPerMinute: number,
  estimatedDurationMinutes: number,
  minimumFare: number
) {
  // Calculate the total fare
  let totalFare =
    baseFare +
    costPerMile * distanceInMiles +
    costPerMinute * estimatedDurationMinutes

  // Apply the minimum fare rule
  if (totalFare < minimumFare) {
    totalFare = minimumFare
  }

  return totalFare
}
