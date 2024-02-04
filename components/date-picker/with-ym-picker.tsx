import { getMonth, getYear } from "date-fns";
import { range } from "lodash";
import React, { useState } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";

interface IDtPickerWithYM {
  date?: Date;
  onSelect?: (date: Date) => void;
}

export const DtPickerWithYM = ({
  date: Initdate,
  onSelect,
}: IDtPickerWithYM) => {
  const [startDate, setStartDate] = useState<Date | null | undefined>(Initdate);
  const years = range(1990, new Date().getFullYear() + 1, 1);

  const monthsIntl = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(2022, i, 1);
    return new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);
  });

  console.log("monthsIntl", monthsIntl);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const MyContainer = ({
    className,
    children,
  }: {
    className: string;
    children: React.ReactNode;
  }) => {
    return (
      <div className="flex flex-auto bg-slate-300 w-full">
        <CalendarContainer className="flex flex-col">
          <div style={{ position: "relative" }}>{children}</div>
        </CalendarContainer>
      </div>
    );
  };

  return (
    <DatePicker
      calendarContainer={MyContainer}
      onSelect={onSelect}
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div
          style={{
            margin: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            {"<"}
          </button>
          <select
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(parseInt(value))}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            {">"}
          </button>
        </div>
      )}
      selected={startDate}
      onChange={(date) => setStartDate(date)}
    />
  );
};

export default DtPickerWithYM;
