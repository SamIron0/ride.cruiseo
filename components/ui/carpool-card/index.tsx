
interface CarpoolCardProps {
  id: string
  alwaysShowDownloadBtn?: boolean
}

export function CarpoolCard({ id, alwaysShowDownloadBtn }: CarpoolCardProps) {

  return (
    <div className="bg-gray-700 p-2 border border-1 rounded-md ">
      <p>Departure</p>
    </div>
  )
}
