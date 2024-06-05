import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  IconCircleCheckFilled,
  IconCircleXFilled,
  IconLoader2
} from "@tabler/icons-react"
import { FC, useCallback, useState } from "react"

interface ProfileStepProps {
  username: string
  usernameAvailable: boolean
  displayName: string
  onUsernameAvailableChange: (isAvailable: boolean) => void
  onUsernameChange: (username: string) => void
  onDisplayNameChange: (name: string) => void
}

export const ProfileStep: FC<ProfileStepProps> = ({
  username,
  usernameAvailable,
  displayName,
  onUsernameAvailableChange,
  onUsernameChange,
  onDisplayNameChange
}) => {
  const [loading, setLoading] = useState(false)

  const debounce = (func: (...args: any[]) => void, wait: number) => {
    let timeout: NodeJS.Timeout | null

    return (...args: any[]) => {
      const later = () => {
        if (timeout) clearTimeout(timeout)
        func(...args)
      }

      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  return (
    <>
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <Label>Full name</Label>

          <div className="text-xs">
            {usernameAvailable ? (
              <div className="text-green-500">AVAILABLE</div>
            ) : (
              <div className="text-red-500">UNAVAILABLE</div>
            )}
          </div>
        </div>

        <div className="relative">
          <Input
            className="pr-10 text-[16px]"
            placeholder="username"
            value={username}
            onChange={e => {
              onUsernameChange(e.target.value)
            }}
          />

          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {loading ? (
              <IconLoader2 className="animate-spin" />
            ) : usernameAvailable ? (
              <IconCircleCheckFilled className="text-green-500" />
            ) : (
              <IconCircleXFilled className="text-red-500" />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
