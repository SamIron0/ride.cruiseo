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
  onUsernameChange: (username: string) => void
  phone: string
  onPhoneChange: (phone: string) => void
}

export const ProfileStep: FC<ProfileStepProps> = ({
  username,
  onUsernameChange,
  phone,
  onPhoneChange
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
        </div>
        <div className="flex items-center space-x-2">
          <Label>Phone number</Label>
        </div>

        <div className="relative">
          <Input  
            className="pr-10 text-[16px]"
            placeholder="e.g. 2041329178"
            value={phone}
            onChange={e => {
              onPhoneChange(e.target.value)
            }}
          />
        </div>
      </div>
    </>
  )
}
