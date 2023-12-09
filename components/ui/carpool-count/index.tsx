import { Suspense } from "react"

interface CountDisplayProps {
  count?: number
}

function CountDisplay({ count }: CountDisplayProps) {
  return (
    <p className="text-gray-500 mb-12 text-base animate-in fade-in slide-in-from-bottom-4 duration-1200 ease-in-out">
      {count || "–––"} trips booked and counting!
    </p>
  )
}

async function AsyncCarpoolCount() {
  const count = 150 //await getEmojisCount()

  return <CountDisplay count={count} />
}

export function CarpoolCount() {
  return (
    <Suspense fallback={<CountDisplay />}>
    </Suspense>
  )
}
