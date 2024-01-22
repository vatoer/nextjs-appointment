"use client";
import DatePicker from "@/components/date-picker";
import { useDatePicker } from "@/hooks/use-date-picker";
import { useSlot } from "@/hooks/use-slot";
import { useDaysOff } from "./days-off-provider";
import WeeklySlotPicker from "./weekly-slot-picker";

const SlotPicker = () => {
  const dtState = useDatePicker();
  const slot = useSlot();
  const offDays = useDaysOff();
  console.log("off Days", offDays);
  return (
    <div className="w-full">
      <span className="text-2xl font-bold">
        {slot.dt
          ? slot.dt.toLocaleDateString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })
          : "Pick a date"}
      </span>
      <DatePicker />
      <WeeklySlotPicker startDate={dtState.dt} />
    </div>
  );
};

export default SlotPicker;
