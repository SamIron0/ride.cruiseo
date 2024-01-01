import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { debounce } from 'lodash';

function getAddressPredictions(input: string) {
  const [predictions, setPredictions] = useState<string[]>([]);
  const autocomplete = useRef<google.maps.places.AutocompleteService | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const loader = new Loader({
          apiKey: "AIzaSyBrJKwpf7vX885NfARu7oCex9q0s3r0SuM",
          libraries: ['places'],
        });
        await loader.load();
        autocomplete.current = new google.maps.places.AutocompleteService();
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  const getPlacePredictions = (input: string) => {
    autocomplete.current?.getPlacePredictions(
      {
        input,
        componentRestrictions: { country: 'CA' },
      },
      async (predictions: google.maps.places.AutocompletePrediction[] | null) => {
        if (predictions) {
          const promises = predictions.map(async (prediction) => {
            const details = await getPlaceDetails(prediction.place_id);
            return details?.geometry?.location;
          });

          const locations = await Promise.all(promises);
          setPredictions(locations.map((location) => `${location.lat()},${location.lng()}`));
        } else {
          setPredictions([]);
        }
      }
    );
  };

  const debouncedGetPlacePredictions = debounce(getPlacePredictions, 500);

  const getPlaceDetails = async (placeId: string) => {
    return new Promise<google.maps.places.PlaceResult | null>((resolve) => {
      if (autocomplete.current) {
        autocomplete.current.getDetails(
          { placeId },
          (result: google.maps.places.PlaceResult | null, status: google.maps.places.PlacesServiceStatus) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              resolve(result);
            } else {
              resolve(null);
            }
          }
        );
      } else {
        resolve(null);
      }
    });
  };

  useEffect(() => {
    debouncedGetPlacePredictions(input);
  }, [input]);
  console.log(predictions)
  return predictions;
}

export default getAddressPredictions;
