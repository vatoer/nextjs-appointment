import DailySlotPicker from "./daily-slot-picker";

interface IWeeklySlotPickerProps {
  startDate?: Date|undefined|null;
}
export const WeeklySlotPicker = ({
  startDate ,
  ...props
}: IWeeklySlotPickerProps) => {

  startDate = startDate || new Date();

  const isWeekend = (date: Date) => {
    const dayIndex = date.getDay();
    return dayIndex === 0 || dayIndex === 6;
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

  const getDatesForCurrentWeek = (startDate: Date) => {
    const dates = [];
    const startDay = startDate.getDay(); // Get the day index of the start date (0 for Sunday, 1 for Monday, etc.)

    // Get the date for the previous Monday
    const previousMonday = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() - startDay + 1
    );

    // Get the dates for the previous week (Monday to Sunday)
    for (let i = 0; i < 7; i++) {
      const date = new Date(
        previousMonday.getFullYear(),
        previousMonday.getMonth(),
        previousMonday.getDate() + i
      );
      dates.push(date);
    }

    return dates;
  };

  //const startDate = new Date("19 jan 2024"); // Replace with your desired start date
  if (isWeekend(startDate)) {
    startDate.setDate(getNextMonday(startDate).getDate());
  }
  const weekdayDates = getDatesForCurrentWeek(startDate).filter(
    (date) => !isWeekend(date)
  );

  return (
    <div className="grid grid-cols-5 gap-1">
      {weekdayDates.map((date, index) => {
        return (
          <div className="flex flex-col">
            <div className="col-span-1">
              <h1>{date.toLocaleDateString()}</h1>
            </div>
            <DailySlotPicker key={index} dt={date} />
          </div>
        );
      })}
    </div>
  );
};

export default WeeklySlotPicker;
