"use client"

import { useSearchParams } from "next/navigation"
import { useContext, useMemo, useRef, useState } from "react"
import { BiSearch } from "react-icons/bi"
import { TextareaAutosize } from "../ui/textarea-autosize"
import { cn } from "@/lib/utils"
import { CruiseoContext } from "@/context/context"

const Search = () => {
  const { setSearchInput } = useContext(CruiseoContext)
  const params = useSearchParams()
  const [isTyping, setIsTyping] = useState<boolean>(false)

  const locationValue = params?.get("locationValue")
  const startDate = params?.get("startDate")
  const locationLabel = "Search"
  const [input, setInput] = useState<string>("")

  const chatInputRef = useRef<HTMLTextAreaElement | null>(null)

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleInputChange = (value: string) => {
    setInput(value)
    chatInputRef?.current?.focus()

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }

    debounceTimeout.current = setTimeout(() => {
      setSearchInput(value)
    }, 500) // Adjust the delay as needed (500ms in this case)
  }
  return (
    <div
      className="relative max-w-sm flex min-h-[40px] w-full items-center justify-center rounded-xl border border-[#232325]
    "
    >
      <TextareaAutosize
        textareaRef={chatInputRef}
        className="text-md flex w-full resize-none rounded-md border-none bg-transparent py-1 pl-3 pr-14  placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50  focus:outline-none"
        placeholder={`Search`}
        onValueChange={handleInputChange}
        value={input}
        minRows={1}
        maxRows={18}
        onCompositionStart={() => setIsTyping(true)}
        onCompositionEnd={() => setIsTyping(false)}
      />
      <div className="absolute right-3 flex cursor-pointer justify-center hover:opacity-50">
        <BiSearch
          className={cn(
            "rounded bg-[#4169E1] p-1 text-secondary",
            !input ? "cursor-not-allowed opacity-50" : ""
          )}
          onClick={() => {
            setSearchInput(input)
          }}
          size={25}
        />
      </div>
    </div>
  )
}

export default Search
