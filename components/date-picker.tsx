"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useState } from "react";
import { is } from "date-fns/locale";
import { SelectSingleEventHandler } from "react-day-picker";
import { useDatePicker } from "@/hooks/use-date-picker";


export const DatePicker = () => {
    const [date, setDate] = useState<Date>() // use di lokal
    const dtState = useDatePicker() // bs di global
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)


    const handleSelect: SelectSingleEventHandler = (date) => {
        setDate(date);
        dtState.setDate(date);
        setIsPopoverOpen(false);
    }

    return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
};

export default DatePicker;

