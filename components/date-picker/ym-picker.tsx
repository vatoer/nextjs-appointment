import { format, getMonth, getTime, getYear } from "date-fns";
import { range } from "lodash";
import { use, useEffect, useState } from "react";
import { date } from "zod";

interface IYmPickerProps {
  date: Date;
  fromDate?: Date;
  toDate?: Date;
  onSelect?: (date: Date) => void;
}

const YmPicker = ({ date, fromDate, toDate, onSelect }: IYmPickerProps) => {
  const years = range(
    getYear(fromDate ?? new Date().getFullYear() - 1),
    getYear(toDate ?? new Date().getFullYear() + 1) + 1,
    1
  );
  // const months = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];

  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(2022, i, 1);
    return new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);
  });

  //console.log("monthsIntl", months);

  const [year, setYear] = useState(getYear(date ?? new Date()));
  const [month, setMonth] = useState(getMonth(date ?? new Date()));

  useEffect(() => {
    setYear(getYear(date ?? new Date()));
    setMonth(getMonth(date ?? new Date()));
    console.log("date", date);
  }, [date]);

  console.log("year", year);

  return (
    <div className="flex items-center justify-between w-full">
      <select
        value={year}
        className="w-1/2 p-2 border border-gray-300 rounded-md"
        onChange={(e) => {
          const year = parseInt(e.target.value);
          setYear(year);
          onSelect && onSelect(new Date(year, month, 1));
        }}
      >
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
      <select
        value={month}
        className="w-1/2 p-2 border border-gray-300 rounded-md"
        onChange={(e) => {
          const month = parseInt(e.target.value);
          const newDate = new Date(year, month, 1);
          const ym = format(newDate, "yyyyMM");
          const ymFrom = format(fromDate ?? new Date(), "yyyyMM");
          const ymTo = format(toDate ?? new Date(), "yyyyMM");
          if (
            parseInt(ym) < parseInt(ymFrom) ||
            parseInt(ym) > parseInt(ymTo)
          ) {
            alert("out of range");
            return;
          } else {
            setMonth(month);
            onSelect && onSelect(newDate);
            console.log("newDate", newDate);
            console.log("year", year);
            console.log("month", month);
          }
        }}
      >
        {months.map((m, idx) => (
          <option key={idx} value={idx}>
            {m}
          </option>
        ))}
      </select>
    </div>
  );
};

export default YmPicker;
