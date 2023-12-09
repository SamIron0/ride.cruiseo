import { User } from "@supabase/supabase-js"

interface CarpoolCardProps {
  user: User
}

export function CarpoolCard({ user }: CarpoolCardProps) {

  return (
    <div className="bg-gray-700 p-2 border border-1 rounded-md ">
      <div className="flex items-center space-x-3 rtl:space-x-reverse">
        <div className="flex-shrink-0">
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate dark:text-white">
            Destination
                     </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            email@flowbite.com
          </p>
        </div>
        <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
          <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
          Pending
        </span>
      </div>

    </div>
  )
}
