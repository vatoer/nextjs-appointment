import DatePicker from "@/components/date-picker";
import { CalendarProps } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { InputHTMLAttributes, useState } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface IDatePickerFormProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type?: string;
  register: UseFormRegister<any>;
  name: string;
  error: FieldError | undefined;
  className?: string;
}

export type DatePickerFormProps = IDatePickerFormProps & CalendarProps;

const DatePickerForm = ({
  label,
  register,
  name,
  error,
  type = "text",
  className,
  ...props
}: DatePickerFormProps) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const handleSelect = (date: Date) => {
    setSelectedDate(format(date, "yyyy-MM-dd"));
  };
  return (
    <div
      className={cn(
        "flex flex-col w-full mt-1 md:mt-0",
        className && className
      )}
    >
      <label htmlFor={name} className="text-sm">
        {label}
      </label>
      <DatePicker
        date={new Date()}
        //date={props.date}
        onSelect={handleSelect}
        fromDate={props.fromDate}
        toDate={props.toDate}
      />
      <input type="hidden" id={name} {...register(name)} value={selectedDate} />
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  );
};

export default DatePickerForm;
