"use client";
import DatePicker from "@/components/date-picker";
import WeeklySlotPicker from "./weekly-slot-picker";
import { useDatePicker } from "@/hooks/use-date-picker";
import { useSlot } from "@/hooks/use-slot";

const SlotPicker = () => {
  const dtState = useDatePicker();
  const slot = useSlot();
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
