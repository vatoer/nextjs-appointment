"use client";

import YmPicker from "@/components/date-picker/ym-picker";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarProps } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDatePicker } from "@/hooks/use-date-picker";
import { cn } from "@/lib/utils";
import { format, getYear } from "date-fns";
import { enGB, id } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { RefObject, createRef, forwardRef, useState } from "react";
import {
  DayPicker,
  DayPickerSingleProps,
  SelectSingleEventHandler,
} from "react-day-picker";
import InputForm, { InputFormProps } from "./input-form";

//export type CalendarProps = React.ComponentProps<typeof DayPicker>;

interface IDatePickerProps {
  date?: Date;
  onSelect?: (date?: Date) => void;
  ref: RefObject<unknown>;
}

export type InputDatePickerProps = IDatePickerProps &
  InputFormProps &
  CalendarProps;

  const ref = createRef();

export const InputDatePicker = forwardRef({
  date: Initdate,
  onSelect,
  error,
  ref
  ...props
}: InputDatePickerProps) => {
  const [date, setDate] = useState<Date | undefined>(Initdate);
  const [month, setMonth] = useState<Date | undefined>(date);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleSelect: SelectSingleEventHandler = (newDate) => {
    //console.log("newDate", newDate);
    setDate(newDate ?? date);
    onSelect && onSelect(newDate ?? date);
    setIsPopoverOpen(false);
  };

  const defaultStartDate = new Date();
  const defaultEndDate = new Date();
  defaultEndDate.setMonth(defaultEndDate.getMonth() + 1);

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <InputForm
          label="Tanggal Lahir"
          register={props.register}
          name="tanggalLahir"
          error={error}
          className="md:w-1/3"
          value={date ? format(date, "dd-MM-yyyy") : ""}
        />
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <YmPicker
          fromDate={props.fromDate ?? defaultStartDate}
          toDate={props.toDate ?? defaultEndDate}
          onSelect={setMonth}
          date={date}
          locale={props.locale ?? id}
        />
        <Calendar
          mode="single"
          locale={props.locale ?? id}
          selected={date}
          onSelect={handleSelect}
          fromDate={props.fromDate ?? defaultStartDate}
          toDate={props.toDate ?? defaultEndDate}
          month={month ?? date}
          onMonthChange={setMonth}
        />
      </PopoverContent>
    </Popover>
  );
};

export default InputDatePicker;
