'use client'

export default function App() {
  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch("/api/checkout_sessions", {
      method: "POST"
    })
      .then(res => res.json())
      .then(data => data.clientSecret)
  }, [])

  const options = { fetchClientSecret }

  return (
    <></>
  )
}
