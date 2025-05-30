"use client"

import * as React from "react"
import { format } from "date-fns"
import { Button, Calendar } from "@/components/ui"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Image from "next/image"

export function DatePicker({ onChange }: { onChange?: (date: Date | undefined) => void } = {}) {
  const [date, setDate] = React.useState<Date>()

  React.useEffect(() => {
    if (onChange) onChange(date)
  }, [date, onChange])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className="w-auto h-auto rounded-[8px] border-[#d9d9d9] px-3 py-4 gap-2 font-sfpro text-base text-[#101010] leading-[1.1]"
        >
          {date ? format(date, "dd/MM/yy") : <span>dd/mm/aa</span>}
          <Image
          src={"/img/calendar-icon.svg"}
          alt="Date Picker Icon"
          width={24}
          height={24}
          className="h-6 w-6"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
