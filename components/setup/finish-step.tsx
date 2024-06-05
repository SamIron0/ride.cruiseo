import { FC } from "react"

interface FinishStepProps {
  username: string
}

export const FinishStep: FC<FinishStepProps> = ({ username }) => {
  return (
    <div className="space-y-4">
      <div>
        Welcome to Cruiseo
        {username.length > 0 ? `, ${username.split(" ")[0]}` : null}!
      </div>

      <div>Click next to start creating.</div>
    </div>
  )
}
