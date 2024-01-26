"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDatePicker } from "@/hooks/use-date-picker";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { enUS, id, is } from "date-fns/locale";
import { enGB } from "date-fns/locale/en-GB";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { SelectSingleEventHandler } from "react-day-picker";

export const DatePicker = () => {
  const [date, setDate] = useState<Date>(); // use di lokal
  const dtState = useDatePicker(); // bs di global
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleSelect: SelectSingleEventHandler = (date) => {
    setDate(date);
    dtState.setDate(date);
    setIsPopoverOpen(false);
  };

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
          locale={id}
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
          fromDate={new Date()}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
