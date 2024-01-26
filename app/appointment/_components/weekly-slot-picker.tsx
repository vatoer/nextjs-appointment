import DailySlotPicker from "./daily-slot-picker";

interface IWeeklySlotPickerProps {
  startDate?: Date | undefined | null;
  weekendDays?: number[];
}
export const WeeklySlotPicker = ({
  startDate,
  weekendDays = [0, 6], // default to Sunday and Saturday
  ...props
}: IWeeklySlotPickerProps) => {
  startDate = startDate || new Date();

  const isWeekend = (date: Date) => {
    const dayIndex = date.getDay();
    //return dayIndex === 0 || dayIndex === 6;
    return weekendDays.includes(dayIndex);
  };

  const getNextWorkingDay = (startDate: Date) => {
    let date = startDate;
    while (isWeekend(date)) {
      date.setDate(date.getDate() + 1);
    }
    return date;
  };

  const getNextMonday = (today: Date): Date => {
    const currentDay = today.getDay();
    const daysUntilNextMonday = currentDay === 0 ? 1 : 8 - currentDay;
    const nextMonday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + daysUntilNextMonday
    );
    return nextMonday;
  };

  //get dates for current week which not in weekend days
  const getDatesForCurrentWeek = (startDate: Date): Date[] => {
    const dates = [];
    const day = startDate.getDay();
    const diff = startDate.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    const monday = new Date(startDate.setDate(diff));
    for (let i = 0; i < 7; i++) {
      dates.push(new Date(monday));
      monday.setDate(monday.getDate() + 1);
    }
    return dates;
  };

  const getWorkingDays = (date: Date, days: number): Date[] => {
    const workingDays = [];
    let currentDate = new Date(date);
    let count = 0;
    while (count < days) {
      currentDate = getNextWorkingDay(currentDate);
      workingDays.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
      count++;
    }
    return workingDays;
  };

  const weekdayDates = getWorkingDays(startDate, 5);
  // TODO : setting locale from hook
  const locale: Intl.LocalesArgument = "id-ID";
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return (
    <div className="grid grid-cols-5 gap-2">
      {weekdayDates.map((date, index) => {
        return (
          <div className="flex flex-col" key={index}>
            <div className="col-span-1">
              <h1>{date.toLocaleDateString(locale, options)}</h1>
            </div>
            <DailySlotPicker key={index} dt={date} />
          </div>
        );
      })}
    </div>
  );
};

export default WeeklySlotPicker;
