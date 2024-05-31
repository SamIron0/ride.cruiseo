"use client"

import { useEffect, useRef, useState } from "react"
import { Loader } from "@googlemaps/js-api-loader"
import { debounce } from "lodash"

function getAddressPredictions(input: string) {
  const [predictions, setPredictions] = useState<string[]>([])
  const autocomplete = useRef<google.maps.places.AutocompleteService | null>(
    null
  )

  useEffect(() => {
    const loadData = async () => {
      try {
        const loader = new Loader({
          apiKey: "AIzaSyBrJKwpf7vX885NfARu7oCex9q0s3r0SuM",
          libraries: ["places"]
        })
        await loader.load()
        autocomplete.current = new google.maps.places.AutocompleteService()
      } catch (error) {
        console.error("Error loading data:", error)
      }
    }

    loadData()
  }, [])

  const getPlacePredictions = (input: string) => {
    autocomplete.current?.getPlacePredictions(
      {
        input,
        componentRestrictions: { country: "CA" }
      },
      (predictions: any[] | null) => {
        setPredictions(
          predictions?.map(prediction => prediction.description) || []
        )
      }
    )
  }

  const debouncedGetPlacePredictions = debounce(getPlacePredictions, 500)

  useEffect(() => {
    debouncedGetPlacePredictions(input)
  }, [input])

  return predictions
}

export default getAddressPredictions
