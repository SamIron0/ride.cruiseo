export default async function getListingById(destinationId?: any) {
  try {
    const url = '/api/getDestinationById';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(destinationId)
    };
    const response = await fetch(url, options);
    const destination = await response.json();
    return destination;
  } catch (error) {
    console.error('An error occurred while fetching destination by id:', error);
  }
}
